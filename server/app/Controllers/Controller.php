<?php

namespace App\Controllers;

/**
 * Базовый класс контроллера
 * Class Controller
 * @package App\Controllers
 */

class Controller
{
    protected $container;

    public function __construct($container)
    {
        $this->container = $container;

    }

    public function __get($property)
    {
        if ($this->container->{$property}) {
            return $this->container->{$property};
        }
    }

    public function sendResult($result, $data, $response)
    {
        //Операция прошла успешно
        if ($result === true) {
            return $response->withJson($data, 200);
            //Операция прошла неуспешно
        } elseif ($result === false) {
            return $response->withJson('query error', 400);
        } else {
            //Непредвиденная ошибка
            return $response->withJson($result, 500);
        }

    }

}