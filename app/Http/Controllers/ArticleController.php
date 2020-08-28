<?php

namespace App\Http\Controllers;

use App\functions\Scopus;
use Illuminate\Http\Request;
use App\Article;
use App\Author;
use function App\functions\pretty_print;

class ArticleController extends Controller
{
//    public function addAllAuthorArticles(){}

    public function test($authorID){
        $scopus = new Scopus();
//        dd($scopus->getAuthorArticles($authorID));

        $article_id = 'SCOPUS_ID:85069438729';

        dd($scopus->articleRetrieval($article_id));
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

    public function main(){
        $authors = Author::all();

//        $authors->map(function ($author){
//           $author->
//        });

        foreach ($authors as $author){
            $articleInfo = Article::getArticleForCitingByAuthor($author->id);
            dump([
                'Name' => $author->name,
                'Title' => $articleInfo['article']->title,
                'Publication_Name' => $articleInfo['article']->publication_name,
                'Cites_Needed' => $articleInfo['citesNeeded'],
                'Article_ID' => $articleInfo['article']->article_id,
            ]);
        }

//        dd($authors);

//        return view('', compact());
    }

    public function search(Request $request){

    }

//    public function authorsArticle($id){
//        $article = Article::getArticleForCitingByAuthor($id);
//
//
//    }
}
