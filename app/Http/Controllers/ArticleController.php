<?php

namespace App\Http\Controllers;

use App\functions\Scopus;
use Illuminate\Http\Request;
use App\Article;
use App\Author;
use function App\functions\pretty_print;
use config\keys;

class ArticleController extends Controller
{
//    public function addAllAuthorArticles(){}

    public function test()
    {
        $scopus = new Scopus();
//        dd($scopus->getAuthorArticles($authorID));
        $authorId = 57190492977;
//        $authorId = 56950079900;

//        $article_id = 'SCOPUS_ID:85084233956';
//        $article_id = 'SCOPUS_ID:85069438729';
//        $article_id = '85069438729';
//        $article_eid = '2-s2.0-85069438729';
//        $doi = '10.1109/PDGC.2018.8745822';
//        $article_id_1 = '85084233956';

//        dd($scopus->articleCitationOverview($article_eid));
        dd($scopus->getArticlesIds($authorId));
//        dump($scopus->getCitationInfo($doi));
//        dump($scopus->articleRetrieval($article_id));
//        dump($scopus->articleRetrieval('SCOPUS_ID:85084189966'));
//        dd($scopus->getAuthorArticles(57190492977));
//        dd($scopus->authorRetrieval($authorId));
//        dd($scopus->addAuthorInfo($authorId));
//        dd(Author::addAuthorInfo($authorId,1));
//        dd(Article::addAllAuthorArticles($authorId,1));
//        dd(Author::addAuthorInfo($authorId));
//        dd($scopus->getCitationInfo($article_id_1));
//        $article = Article::create([
//            'article_id' => 34,
//            'title' => 'title',
//            'publication_name' => 'publicationName',
//            'cited_by_count' => 55,
//            'author_id' => $authorID,
//
//        ]);
//
//        dd($article);

//        $ch = curl_init();
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_URL, 'http://checkip.amazonaws.com/');


//        print_r($this->URL . $this->aRetrieval . '/' . $article_id . '?' . http_build_query($options));

//        $response = curl_exec($ch);
//        curl_close($ch);

//        $data = json_decode($response, true);

//        return $data;
    }

    public function all()
    {
        $authors = Author::all();

//        $authors->map(function ($author){
//           $author->
//        });

        $data = [];

        foreach ($authors as $author) {
            $articleInfo = Article::getArticleForCitingByAuthor($author->id);
//            dump([
//                'Name' => $author->name,
//                'Title' => $articleInfo['article']->title,
//                'Publication_Name' => $articleInfo['article']->publication_name,
//                'Cites_Needed' => $articleInfo['citesNeeded'],
//                'Article_ID' => $articleInfo['article']->article_id,
//            ]);

            array_push($data, [
                'id' => $articleInfo['article']->id,
                'name' => $author->name,
                'title' => $articleInfo['article']->title,
                'publicationName' => $articleInfo['article']->publication_name,
                'description' => $articleInfo['article']->description,
                'keyWords' => $articleInfo['article']->key_words,
                'citesNeeded' => $articleInfo['citesNeeded'],
                'articleID' => $articleInfo['article']->article_id,
            ]);
        }

////        dd($authors);

//        return '[{"name":"Pljonkin A.P.","title":"The review of the commercial quantum key distribution system","publicationName":"PDGC 2018 - 2018 5th International Conference on Parallel, Distributed and Grid Computing","description":"\u00a9 2018 IEEE.A review of the existing commercial quantum key distribution systems was conducted. The principle of operation of a fiber-optic quantum key distribution system with phase coding of photon states is described. The operation of the system in the mode of forming quantum keys is described. The synchronization process is analyzed, which consists in detecting a time interval with an optical pulse. The basic properties and parameters of auto-compensation quantum key distribution system are reviewed. The images of the current stand of the quantum-cryptographic network are given. The stand includes two stations of the quantum key distribution system with phase coding of photon states, two servers and data transmission channels. It is shown that the formation of a quantum key in the experiment is carried out at a rate of 500 bits per second. The length of the quantum communication channel in the experiment is 24 km. In this case, the quantum channel consists of a conventional singlemode optical fiber. Trends in the development of quantum key distribution systems, as well as trends in the development of protocols for quantum cryptography was conducted.","keyWords":"algorithm,photon pulse,quantum key,synchronization","citesNeeded":3,"articleID":85069438729},{"name":"Rumyantsev K.E.","title":"Robust algorithm for detection of image features","publicationName":"Proceedings of 2016 IEEE East-West Design and Test Symposium, EWDTS 2016","description":"\u00a9 2016 IEEE.Authors proved existence of uniformly most powerful invariant algorithm based on the t-test. Conducted study allowed to synthesize decision rule for detection of image features on 3\u00d73 pixel patch was found. Simulation proved stability of the proposed feature point detection algorithm to change of mean value and standard deviation of background pixels\' intensity. Versatility of detection algorithm determined only by set of pixels in the signal sample. Uniqueness of detected features determined by formation of support and analyzed samples. Authors obtained equations that allow to assess the effectiveness of the robust feature detector.","keyWords":"","citesNeeded":4,"articleID":85015188757},{"name":"Veselov G.E.","title":"Synergetic approach to quadrotor helicopter control with attractor-repeller strategy of nondeterministic obstacles avoidance","publicationName":"International Congress on Ultra Modern Telecommunications and Control Systems and Workshops","description":"\u00a9 2014 IEEE.In this paper we show the new approach to four-motors unmanned air vehicle control at the environment with rigid obstacles of various shapes. This approach is based on principles and methods of synergetic control theory. We explore analysis of mathematical model of four-motors unmanned air vehicle accounting of external disturbance action and synthesis of nonlinear synergetic control law for this robot by using method of analytical design of aggregated regulators. For mobile robot adaptation to external environment, we have developed \"attractor-repeller\" strategy of nondeterministic obstacles avoidance. The essence of this strategy is that desired ensemble of unmanned air vehicle end states presented as attracting manifolds, i.e. attractors, and obstacles at quadcopter pass presented as three-dimensional repeller (drive back) surface deforming the phase space of mobile robot therefore forming an avoidance trajectory. A bypass direction is formed according to condition of minimal motion resistance in the fully nondeterministic environment or according condition of shorter bypass way at obstacle known parameters. This approach is also could be applied to dynamically changeable obstacles but we might have information about obstacle speed in that case.","keyWords":"","citesNeeded":2,"articleID":84932177432},{"name":"Petrov D.","title":"Universal robust algorithm for detection of image features","publicationName":"Proceedings of the World Congress on Intelligent Control and Automation (WCICA)","description":"\u00a9 2016 IEEE.Effective detection of the feature points in images requires usage of detectors that produces similar results in variable observation conditions. Authors present a feature detector which is based on a uniformly most powerful invariant algorithm that uses t-test. The authors obtained equations that allow evaluating the effectiveness of the robust feature detector. Simulation proved the robustness (constant rate of false alarms) of the proposed feature point detection algorithm to changes in mean value and standard deviation of background pixels\' intensity. The study proved invariance of the synthesized detector structure to the angle of the image rotation. The uniqueness of detected features is determined by the formation of support and analyzed samples.","keyWords":"","citesNeeded":2,"articleID":84991594367}]';
        return $data;
    }

    public function hot()
    {
        $authors = Author::all();


        $data = [];

        foreach ($authors as $author) {
            $articleInfo = Article::getArticleForCitingByAuthor($author->id);

            if ($articleInfo['citesNeeded'] == 1) {
                array_push($data, [
                    'id' => $articleInfo['article']->id,
                    'name' => $author->name,
                    'title' => $articleInfo['article']->title,
                    'publicationName' => $articleInfo['article']->publication_name,
                    'citesNeeded' => $articleInfo['citesNeeded'],
                    'articleID' => $articleInfo['article']->article_id,
                ]);
            }
        }

//        return [];
        return $data;
    }

    public function search(Request $request)
    {

    }

    public function authUser(){
        $scopus = new Scopus();

        $scopus->authUser();
    }

//    public function authorsArticle($id){
//        $article = Article::getArticleForCitingByAuthor($id);
//
//
//    }
}
