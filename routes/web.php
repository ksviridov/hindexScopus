<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\TrustProxies;

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

//Route::get('/{url?}', function () {
//    return view('welcome');
//});

//Route::get('/reload',)
//Route::get('/', 'ArticleController@main');

Route::get('/api/info', 'Controller@api');
Route::get('/api/test', 'ArticleController@test');
Route::get('/api/all', 'ArticleController@all');
Route::get('/api/hot', 'ArticleController@hot');
Route::get('/api/search', 'ArticleController@search');
//Route::get('/api/auth', 'ArticleController@authUser');


//Route::get('/login', 'AuthController@main');



//Route::get('/api/hot', 'ArticleController@main');
//Route::get('/api/hot', 'ArticleController@main');


//Route::get('author/test/{authorId}', 'AuthorController@test');
//
//
//Route::get('author/article/{id}', 'ArticleController@test');
//
//
//Route::get('article/test/{authorId}', 'ArticleController@test');


//Route::view('/{path?}', '');

//Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
