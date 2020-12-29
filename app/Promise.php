<?php

namespace App;

use App\functions\Scopus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promise extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    public function author(){
        return $this->belongsTo(Author::class);
    }

    public function article(){
        return $this->belongsTo(Article::class);
    }


    public static function checkForCite($authorID, $articleID){
        $scopus = new Scopus();

        $articleIDs = $scopus->getArticlesIds($authorID);

        $article = $scopus->articleRetrieval($articleIDs[0]);

        foreach ($article['abstracts-retrieval-response']['item']['bibrecord']['tail']['bibliography']['reference'] as $cite){
            if ($cite['ref-info']['refd-itemidlist']['itemid']['$'] == $articleID){
                return true;
            }
        }

        return false;

    }
}
