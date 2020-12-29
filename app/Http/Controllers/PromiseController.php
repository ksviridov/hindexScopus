<?php

namespace App\Http\Controllers;

use App\Article;
use App\Promise;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class PromiseController extends Controller
{

    public function make($id){
        $user = Auth::user();

//        return $user->author;
        Promise::create([
            'article_id' => $id,
            'author_id' => $user->author->id,
        ]);

        $article = Article::find($id);
        $article->cited_by_count += 1;
        $article->save();

        return 'success';
    }

    public function delete($id){
        $user = Auth::user();
//        $article = Article::find()
        $user->author->promises->find($id)->forceDelete();

        $article = Article::find($id);
        $article->cited_by_count -= 1;
        $article->save();

        return 'success';
    }

    public function cited($id){
        $user = Auth::user();
        $article = Article::find($id);

        if (Promise::checkForCite($user->scopus_id, $article->article_id)){
            $user->author->promises->find($id)->delete();

            return 'success';
        }

//        $article = Article::find($id);
//        $article->cited_by_count -= 1;
//        $article->save();
        return 'no such citation';
    }

    public function promised(){
        $user = Auth::user();

        $articles = [];

        foreach ($user->author->promises as $promise){
            $articles[] = $promise->article;
        }

        return $articles;
    }
}
