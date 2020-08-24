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
        $authorsIDs = [57190492977, 6602720500, 7003638121, 56950079900];

        Author::query()->delete();
        Article::query()->delete();

//        $author = new Author();
//        $article = new Article();

        foreach ($authorsIDs as $authorID){
            $author = Author::addAuthorInfo($authorID);
            Article::addAllAuthorArticles($authorID, $author->id);
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
