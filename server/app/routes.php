<?php

use App\Middleware\AuthMiddleware;
use App\Middleware\GuestMiddleware;


// Маршруты без авторизации
/**
 * Лэндинг
 */
$app->get('/', 'HomeController:index')->setName('home');


/**
 * Регистрация запрос
 */
$app->post('/auth/signup', 'AuthController:postSignUp')->setName('auth.signup');


/**
 * Авторизация
 */
$app->get('/auth/signin', 'AuthController:getSignIn')->setName('auth.signin')->add(new GuestMiddleware($container));

/**
 * Авторизация запрос
 */
$app->post('/auth/signin', 'AuthController:postSignIn');


//Маршруты с необходимостью авторизации
$app->group('', function () {
    /**
     * Лк пользователя
     */
    $this->get('/ats/', 'UserpanelController:index')->setName('ats');

    /**
     * Разлогиниться
     */
    $this->get('/auth/signout', 'AuthController:getSignOut');
})->add(new AuthMiddleware($container));


//Маршруты API
$app->group('/api', function () {

    //Авторизация через вк
    $this->group('/vk', function () {
        /**
         * Получить линк для авторизации через вк
         */
        $this->get('/link', 'VkauthController:getLink');

        /**
         * Установить токен
         */
        $this->post('/token', 'VkauthController:setToken');
    });


    //Токен csrf

    /**
     * Получить токен
     */
    $this->group('/token', function () {
        $this->get('', 'TokenController:getToken');
    });

    //Пользователь
    $this->group('/user', function () {

        /**
         * Получить данные текущего пользователя
         */
        $this->get('', 'UserController:getUser');

        /**
         * Обновить данные текущего пользователя
         */
        $this->put('', 'UserController:updateUser');
    });

    //Сообщества
    $this->group('/groups', function () {

        /**
         * Получить личные группы пользователя
         */
        $this->get('', 'GroupsController:getGroups');
    });

    //Посты
    $this->group('/posts', function () {

        /**
         * Получить посты
         */
        $this->get('', 'PostsController:getPosts');

        /**
         * Добавить пост
         */
        $this->post('', 'PostsController:addPost');

        /**
         * Массовое добавление постов
         */
        $this->post('/massadd', 'PostsController:massAddPost');

        /**
         * Отправит пост на стену вк
         */
        $this->post('/send', 'PostsController:sendPost');

        /**
         * Обновить пост
         */
        $this->put('', 'PostsController:updatePost');

        /**
         * Удалить пост
         */
        $this->delete('/[{id}]', 'PostsController:delPost');
    });

})->add(new AuthMiddleware($container));
