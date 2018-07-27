<?php

namespace App\Controllers;

/**
 * Контроллер лендинга
 * Class HomeController
 * @package App\Controllers
 */

class HomeController extends Controller
{

    /** Открытие лэндинга
     * @param $request
     * @param $response
     * @return mixed
     */
    public function index($request, $response)
    {
        return $this->view->render($response, 'landing.twig');

    }
}