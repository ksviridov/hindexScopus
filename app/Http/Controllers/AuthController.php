<?php

namespace App\Http\Controllers;

use App\Article;
use App\Author;
use App\functions\Scopus;
use App\Http\Requests\RegisterRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                /** @var User $user */
                $user = Auth::user();

                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => 'success',
                    'token' => $token,
                    'user' => $user,
                ]);
            }
        } catch (\Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }


        return response([
            'message' => 'Invalid email/password'
        ], 401);
    }

    public function user(){
        return Auth::user();
    }

    public function register(RegisterRequest $request){

        //TODO: Подтверждение почты

        $scopus = new Scopus();

        $authorCheck = $scopus->authorRetrieval($request->scopus_id);

        if(!array_key_exists('h-index', $authorCheck['author-retrieval-response'][0])){
            return 'Invalid Scopus ID';
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'scopus_id' => $request->scopus_id,
            ]);

            $token = $user->createToken('app')->accessToken;

            $author = Author::addAuthorInfo($user->scopus_id,$user->id);
//            Article::addAllAuthorArticles($user->scopus_id, $author->id);

            dispatch(function () use ($author,$user) {
                Article::addAllAuthorArticles($user->scopus_id, $author->id);
            });

            return response([
                'token' => $token,
                'user' => $user,
            ]);
        }catch (\Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function main(){
        return view('auth.login');
    }

    public function logout(){
        $user = Auth::user();
        $user->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
//    public function logout(Request $request){
//        $request->user()->token()->revoke();
//        return response()->json([
//            'message' => 'Successfully logged out'
//        ]);
//    }


}
