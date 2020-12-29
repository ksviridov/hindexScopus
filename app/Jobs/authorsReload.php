<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Author;
use App\Article;

class authorsReload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $authorsIDs = [57190492977, 6602720500, 7003638121, 56950079900];

//        $authorsIDs = Author::all()->pluck('author_id');
//        $IDs = Author::all()->pluck('id');
        $authors = Author::all();



//        Author::query()->delete();
        Article::query()->delete();

//        $author = new Author();
//        $article = new Article();

        foreach ($authors as $author){
            $author = Author::updateAuthorHindexByAuthor($author);
//            Article::addAllAuthorArticles($authorID, $author->id);

            //TODO: добавить цитаты тем, которые пообещали процитировать {MASS UPDATE METHOD LARAVEL}
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

    }
}
