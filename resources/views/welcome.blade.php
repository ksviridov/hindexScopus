{{--<!DOCTYPE html>--}}
{{--<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">--}}
{{--    <head>--}}
{{--        <meta charset="utf-8">--}}
{{--        <meta name="viewport" content="width=device-width, initial-scale=1">--}}

{{--        <title>Laravel</title>--}}

{{--        <!-- Fonts -->--}}
{{--        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">--}}

{{--    </head>--}}
{{--    <body>--}}
{{--    <script type="text/javascript" src=""></script>--}}
{{--    </body>--}}
{{--</html>--}}
{{--@include(asset('view/main/index.html'))--}}
    <!doctype html>
<html lang="en">
<head>@yield('title')
    <meta name="csrf-token" content="{{csrf_token()}}">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous">
    <style>textarea, body {
            font-family: 'Lato', sans-serif;
        }</style>
</head>
<body>
<div id="app"></div>
<script>window.BASE_URL = 'http://hindex.sfedu.ru/'</script>
<script src="{{ asset('view/main/bundle.js') }}"></script>
</body>
</html>
