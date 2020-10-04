<?php

namespace App\functions;

// 	cbcfd908dde826afd1fe957f48b62733//
//62e5ec2acb6af16ecca00c71192edcb8
// https://api.elsevier.com/content/search/author
// params [ query, apiKey ]
class Scopus
{
    private $URL = 'https://api.elsevier.com/content/';
    private $apiKey = '7593f60d85b11dca565ce826d31503f8';
    private $search = 'search/author';
    private $aRetrieval = 'author/author_id';
    private $scopusSearch = 'search/scopus?';
    private $scopusAbstractId = 'abstract/scopus_id/';
    private $scopusCitations = 'abstract/citations';

    public function authorSearch($name)
    {
        $options = [
            'query' => $name,
            'apiKey' => $this->apiKey,
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $this->URL . $this->search . '?' . http_build_query($options));

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;

    }

    public function getArticlesIds($id)
    {
        $options = [
            'query' => 'AU-ID(' . $id . ')',
            'field' => 'dc:identifier',
            'count' => '100',
            'apiKey' => $this->apiKey,
            'httpAccept' => 'application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $this->URL . $this->scopusSearch . http_build_query($options));

        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);

        $arrData = [];
        foreach ($data['search-results']['entry'] as $entry) {
//    print_r($entry);
            array_push($arrData, $entry['dc:identifier']);
        }

        return $arrData;

    }

    public function authorRetrieval($id)
    {
        $options = [
//            'author_id' => $id,
            'field' => 'surname,initials,h-index',
            'apiKey' => $this->apiKey,
            'view' => 'enhanced',
            'httpAccept' => 'application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $this->URL . $this->aRetrieval . '/' . $id . '?' . http_build_query($options));

//        print_r($this->URL . $this->aRetrieval . '/' . $id . '?' . http_build_query($options));

        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);

        return $data;

    }

    public function getAuthorHIndexById($id)
    {
        $data = $this->authorRetrieval($id);

        $hIndex = $data['author-retrieval-response']['0']['h-index'];

        return $hIndex;
    }

    public function articleRetrieval($article_id)
    {
        $article_id = implode(array_slice(str_split($article_id), 10));
//        $options = [
////            'scopus_id' => $article_id,
//            'field' => 'authors,title,publicationName,volume,issueIdentifier,prism:pageRange,coverDate,article-number,doi,citedby-count,prism:aggregationType',
//            'apiKey' => $this->apiKey,
//            'httpAccept' => 'application/json',
//
//        ];
        $options = [
//            'scopus_id' => $article_id,
//            'field' => 'authors,title,publicationName,volume,issueIdentifier,prism:pageRange,coverDate,article-number,doi,citedby-count,prism:aggregationType',
            'apiKey' => $this->apiKey,
            'view' => 'full',
            'httpAccept' => 'application/json',

        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $this->URL . $this->scopusAbstractId . '/' . $article_id . '?' . http_build_query($options));

//        print_r($this->URL . $this->aRetrieval . '/' . $article_id . '?' . http_build_query($options));

        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);

        $keyWords = [];
        $description = '';

        $arrData = [
            'title' => '',
            'publicationName' => '',
            'description' => '',
            'keyWords' => '',
            'citedByCount' => 0,
            'articleID' => $article_id,
        ];

//        dd($data);

        if ($data['abstracts-retrieval-response']['authkeywords']) {

            foreach ($data['abstracts-retrieval-response']['authkeywords']['author-keyword'] as $keyWord) {
                array_push($keyWords, $keyWord['$']);
            }
        }

        if (array_key_exists('dc:description', $data['abstracts-retrieval-response']['coredata'])){
            $description = $data['abstracts-retrieval-response']['coredata']['dc:description'];
        }

            $arrData = [
                'title' => $data['abstracts-retrieval-response']['coredata']['dc:title'],
                'publicationName' => $data['abstracts-retrieval-response']['coredata']['prism:publicationName'],
                'description' => $description,
                'keyWords' => $keyWords,
                'citedByCount' => $data['abstracts-retrieval-response']['coredata']['citedby-count'],
                'articleID' => $article_id,
            ];

//        print_r(')))))))))))))');

        return $arrData;

//        return $data;

    }

    public function getAuthorArticles($authorID)
    {
        $articlesIds = $this->getArticlesIds($authorID);
//        pretty_print($articlesIds);
//        print_r(')))))))))))))');

//        dd($articlesIds);

//        $articleRetrieval = $this->articleRetrieval();

        $authorArticles = array_map(array('App\functions\Scopus', 'articleRetrieval'), $articlesIds);

        return $authorArticles;
    }

    public function getCitationInfo($articleID){
        $options = [
            'scopus_id' => $articleID,
//            'field' => 'authors,title,publicationName,volume,issueIdentifier,prism:pageRange,coverDate,article-number,doi,citedby-count,prism:aggregationType',
            'apiKey' => $this->apiKey,
//            'view' => 'full',
            'httpAccept' => 'application/json',

        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $this->URL . $this->scopusCitations . '?' . http_build_query($options));


//        print_r($this->URL . $this->aRetrieval . '/' . $article_id . '?' . http_build_query($options));

        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);

        dump($this->URL . $this->scopusCitations . '?' . http_build_query($options));

        return $data;
    }


//    public function getArticleForCitingByAuthorID($id){
//        $articles = $this->getAuthorArticles($id);
////        rsort($articles);
//
//        return $articles;
//
//    }

    public function authUser(){
        $options = [
            'apiKey' => $this->apiKey,
//            'view' => 'full',
            'httpAccept' => 'application/json',
//            'choice' => 'id',
            'platform' => 'scopus',

        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_URL, 'https://api.elsevier.com/authenticate/' . '?' . http_build_query($options));


        $response = curl_exec($ch);
        curl_close($ch);

        dump('https://api.elsevier.com/authenticate/' . '?' . http_build_query($options));

        $data = json_decode($response, true);

        dd($data);
    }


}
