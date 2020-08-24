<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Article;
use App\functions\Scopus;

class Author extends Model
{
    protected $guarded =[];

//    private $authorsIDs = [57190492977, 6602720500, 7003638121, 56950079900];

    public function articles(){
        return $this->hasMany(Article::class);
    }


    public static function addAuthorInfo($authorID){
        $scopus = new Scopus();
        $data = $scopus->authorRetrieval($authorID);

        $author = Author::create([
            'author_id' => $authorID,
            'name' => $data['author-retrieval-response']['0']['preferred-name']['surname'] . ' ' . $data['author-retrieval-response']['0']['preferred-name']['initials'],
            'hindex' => ($data['author-retrieval-response']['0']['h-index'])+0,
        ]);

        return $author;
    }


}
