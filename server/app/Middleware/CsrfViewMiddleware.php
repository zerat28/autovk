<?php

namespace App\Middleware;

class CsrfViewMiddleware extends Middleware
{

    /** Добавление токена к коду страницы
     * @param $request
     * @param $response
     * @param $next
     * @return mixed
     */
    public function __invoke($request, $response, $next)
    {
        $this->container->view->getEnvironment()->addGlobal('csrf', [

            'field' => '
            <input type = "hidden" id="csrf_name" value="__token">
            <input type = "hidden" id="csrf_value" value="' . $this->container->csrf->getToken() . '">
            '
        ]);

        $response = $next($request, $response);

        return $response;
    }

}