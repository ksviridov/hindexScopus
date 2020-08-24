<?php
//include Weather::class;
// 0c5a8f5a566737aeefefe35048ac02fc
//require_once ('Weather.php');
require_once ('Scopus.php');
require_once ('pretty_array.php');
//require_once ('bdConnect.php');


//$weather = new Weather();
//$data = $weather->checkWeather('London');
//$data = json_decode($data, true);
//print_r($data);
//
//echo '</br>';


$scopus = new Scopus();
//$data = $scopus->authorSearch('authlast(Pljonkin) and authfirst(Anton)');
//$data = json_decode($data, true);
//echo '</br>';
//print_r($data);


//$scopus = new Scopus();
//$data = $scopus->authorRetrieval('57190492977');
//$data = json_decode($data, true);
//echo '</br>';
//pretty_print($data);


//$scopus = new Scopus();
//$data = $scopus->getArticlesIds('57190492977');
//$data = json_decode($data, true);
//echo '</br>';
//pretty_print($data);
//$arrData = [];
//foreach ($data['search-results']['entry'] as $entry){
//    print_r($entry);
//    array_push($arrData, $entry['dc:identifier']);
//}
//pretty_print($arrData);

//$scopus = new Scopus();
//print_r(array_slice([1,2,3,4,5,6,7], 4));
//print_r(str_split($arrData[0]));
//$sid = str_split($arrData[0]);
//print_r(array_slice($sid, 10));
//$data = $scopus->articleRetrieval($arrData[0]);
//$data = $scopus->articleRetrieval(array_slice($arrData[0], 0));
//pretty_print($data);
//$data = json_decode($data, true);
//echo '</br>';
//pretty_print($data);
//pretty_print($arrData);

//echo '</br>';
//print_r($data['coord']['lon']);

//$scopus = new Scopus();
//$articles = $scopus->getAuthorArticles('57190492977');
//pretty_print($articles);


//get hIndex
//print_r($scopus->getAuthorHIndexById('57190492977'));


//print_r($scopus->getArticleForCitingByAuthorID('57190492977'));






