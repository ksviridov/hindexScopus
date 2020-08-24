<?php


class Weather
{
    private $appID = '0c5a8f5a566737aeefefe35048ac02fc';
    private $URL = 'http://api.openweathermap.org/data/2.5/weather';

    public function checkWeather($city)
    {
        $options = [
            'q' => $city,
            'appid' => $this->appID,
            'units' => 'metric',
            'lang' => 'en',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $this->URL . '?' . http_build_query($options));

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }
}