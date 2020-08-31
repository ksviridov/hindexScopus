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

    public function test($authorID)
    {
        $scopus = new Scopus();
//        dd($scopus->getAuthorArticles($authorID));
        //57190492977

        $article_id = 'SCOPUS_ID:85084233956';

        dump($scopus->articleRetrieval($article_id));
        dump($scopus->articleRetrieval('SCOPUS_ID:85084189966'));
//        dd($scopus->getAuthorArticles(57190492977));
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
                'name' => $author->name,
                'title' => $articleInfo['article']->title,
                'publicationName' => $articleInfo['article']->publication_name,
                'description' => $articleInfo['article']->description,
                'keyWords' => $articleInfo['article']->key_words,
                'citesNeeded' => $articleInfo['citesNeeded'],
                'articleID' => $articleInfo['article']->article_id,
            ]);
        }

//        dd($authors);

        return dump($data);
    }

    public function hot()
    {
        $authors = Author::all();


        $data = [];

        foreach ($authors as $author) {
            $articleInfo = Article::getArticleForCitingByAuthor($author->id);

            if ($articleInfo['citesNeeded'] == 1) {
                array_push($data, [
                    'name' => $author->name,
                    'title' => $articleInfo['article']->title,
                    'publicationName' => $articleInfo['article']->publication_name,
                    'citesNeeded' => $articleInfo['citesNeeded'],
                    'articleID' => $articleInfo['article']->article_id,
                ]);
            }
        }


        return $data;
    }

    public function search(Request $request)
    {

    }

//    public function authorsArticle($id){
//        $article = Article::getArticleForCitingByAuthor($id);
//
//
//    }
}
