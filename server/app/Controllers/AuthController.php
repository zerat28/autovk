<?php

namespace App\Controllers;

use App\Models\User;


class AuthController extends Controller
{

    /**
     * Регистрация
     * @param $request
     * @param $response
     * @return bool
     */
    public function postSignUp($request, $response)
    {
        $user = User::create([
            'name' => $request->getParam('name'),
            'email' => $request->getParam('email'),
            'password' => password_hash($request->getParam('password'), PASSWORD_DEFAULT)
        ]);

        return $user;

    }

    /** Форма авторизации
     * @param $request
     * @param $response
     * @return mixed
     */
    public function getSignIn($request, $response)
    {
        return $this->view->render($response, 'login.twig');
    }

    /** Авторизация
     * @param $request
     * @param $response
     * @return mixed
     */
    public function postSignIn($request, $response)
    {
        $auth = $this->auth->attempt(
            $request->getParam('email'),
            $request->getParam('password')
        );

        if (!$auth) {
            return $response->withRedirect($this->router->pathFor('auth.signin'));

        } else {
            return $response->withRedirect($this->router->pathFor('ats'));
        }
    }

    /** Разлогиниться
     * @param $request
     * @param $response
     * @return mixed
     */
    public function getSignOut($request, $response)
    {
        $this->auth->logout();
        return $response->withRedirect($this->router->pathFor('home'));
    }

}