<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('login', 'AuthController@login');

Route::post('register', 'AuthController@register');

Route::get('user', 'AuthController@user')->middleware('auth:api');
Route::get('logout', 'AuthController@logout')->middleware('auth:api');
Route::get('make/{id}', 'PromiseController@make')->middleware('auth:api');
Route::get('delete/{id}', 'PromiseController@delete')->middleware('auth:api');
Route::get('cited/{id}', 'PromiseController@cited')->middleware('auth:api');
Route::get('promised', 'PromiseController@promised')->middleware('auth:api');
