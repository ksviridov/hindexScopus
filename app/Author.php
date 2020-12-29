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

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function promises(){
        return $this->hasMany(Promise::class);
    }


    public static function addAuthorInfo($authorID,$id){
        $scopus = new Scopus();
        $data = $scopus->authorRetrieval($authorID);

        $author = Author::create([
            'author_id' => $authorID,
            'name' => $data['author-retrieval-response']['0']['preferred-name']['surname'] . ' ' . $data['author-retrieval-response']['0']['preferred-name']['initials'],
            'hindex' => ($data['author-retrieval-response']['0']['h-index'])+0,
            'user_id'=> $id,
        ]);

        return $author;
    }

    public static function updateAuthorHindexByAuthor($author){
        $scopus = new Scopus();
        $data = $scopus->authorRetrieval($author->authorID);

        $author->hindex = ($data['author-retrieval-response']['0']['h-index'])+0;


        return $author->save();
    }

}
