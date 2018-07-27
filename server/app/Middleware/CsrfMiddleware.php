<?php

namespace App\Middleware;

class CsrfMiddleware extends Middleware
{

    /** Добавление токена к коду страницы
     * @param $request
     * @param $response
     * @param $next
     * @return mixed
     */
    public function __invoke($request, $response, $next)
    {
        $csrf = $this->container->csrf;

        $csrf->setSalt($this->container->csrf_key);

        $csrf->protectJqueryAjax(false);

        $csrf->protectForms(true);

        $response = $next($request, $response);

        return $csrf->__invoke($request, $response, $next);
    }

}