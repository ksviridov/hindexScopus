<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Author;
use App\functions\Scopus;
use Illuminate\Http\Request;

class Article extends Model
{
    protected $guarded =[];

//    private $authorsIDs = [57190492977, 6602720500, 7003638121, 56950079900];

    public function author(){
        return $this->belongsTo(Author::class);
    }

    public static function addAllAuthorArticles($authorID, $dbID){
        $scopus = new Scopus();
        $data = $scopus->getAuthorArticles($authorID);

        foreach ($data as $array){
            Article::create([
            'article_id' => $array['articleID'],
            'title' => $array['title'],
            'publication_name' => $array['publicationName'],
            'cited_by_count' => $array['citedByCount'],
            'author_id' => $dbID,

            ]);
        }

//        $articles = Article::create([
//            'title' => $data['0'],
//            'publication_name' => ,
//            'cited_by_count' => ,
//            'author_id' => ,
//
//        ]);
    }

    public static function getArticleForCitingByAuthor($id){
        $author = Author::find($id);


        $hindex = $author->hindex;

//        $articles = Article::orderBy('cited_by_count', 'desc')->get();
        $articles = $author->articles->sortByDesc('cited_by_count')->values();


        $article = $articles[$hindex];

        if ($article->cited_by_count == $hindex && $articles->count() !== $hindex){
            $article = $articles[$hindex+1];
            $article['cited_by_count'] -= 1;
        }

        $data = [
            'article' => $article,
            'citesNeeded' => $hindex - $article->cited_by_count+1
        ];


        return $data;
    }

    public static function search($search){
//        $articles = Article::query();

        //$lots = Article::where('name', 'like', '%' . $search . '%')->orderBy('id','desc')->paginate(6); return $lots;

//        $articles->where('')
    }
}
