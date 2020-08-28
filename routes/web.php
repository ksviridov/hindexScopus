<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



//Route::get('/reload',)
Route::get('/', 'ArticleController@main');


//Route::get('author/test/{authorId}', 'AuthorController@test');
//
//
//Route::get('author/article/{id}', 'ArticleController@authorsArticle');
//
//
Route::get('article/test/{authorId}', 'ArticleController@test');
