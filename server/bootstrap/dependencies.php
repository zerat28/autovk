<?php

use \Odan\Slim\Csrf\CsrfMiddleware;

$container = $app->getContainer();


// App Service Providers
$container->register(new \App\Services\Database\EloquentServiceProvider());
$container->register(new \App\Services\Auth\AuthServiceProvider());
$container->register(new \App\Services\Vk\VkServiceProvider());
$container->register(new \App\Services\Files\FilesServiceProvider());


$container['img_path'] = function ($container) {
    $directories = $container->get('settings')['directories'];
    return $directories['image_path'];

};

// view renderer
$container['view'] = function ($container) {
    $settings = $container->get('settings')['renderer'];
    $view = new \Slim\Views\Twig($settings['template_path'], [
        'cache' => false,
    ]);

    $view->addExtension(new \Slim\Views\TwigExtension(
        $container->router,
        $container->request->getUri()
    ));

    return $view;
};

// view renderer for index angular file
$container['view_index'] = function ($container) {
    $settings = $container->get('settings')['renderer'];
    $view = new \Slim\Views\Twig($settings['template_path_index'], [
        'cache' => false,
    ]);

    return $view;
};


//CSRF Protected

$container['csrf_key'] = function ($container) {
    $csrf_key = $container->get('settings')['app']['csrf_key'];
    return $csrf_key;

};

$container['csrf'] = function ($container) {
    $sessionId = session_id();
    return new CsrfMiddleware($sessionId);
};

$app->add(new \App\Middleware\CsrfViewMiddleware($container));

$app->add(function ($request, $response, $next) {
    $csrf = $this->get('csrf');

    $csrf->setSalt($this->get('csrf_key'));

    $csrf->setTokenName('__token');

    $csrf->protectJqueryAjax(false);

    $csrf->protectForms(true);

    return $csrf->__invoke($request, $response, $next);
});


//Controllers
$container['HomeController'] = function ($container) {
    return new App\Controllers\HomeController($container);
};

$container['TokenController'] = function ($container) {
    return new App\Controllers\TokenController($container);
};

$container['AuthController'] = function ($container) {
    return new App\Controllers\AuthController($container);
};

$container['UserpanelController'] = function ($container) {
    return new App\Controllers\UserpanelController($container);
};

$container['UserController'] = function ($container) {
    return new App\Controllers\UserController($container);
};

$container['VkauthController'] = function ($container) {
    return new App\Controllers\VkauthController($container);
};

$container['GroupsController'] = function ($container) {
    return new App\Controllers\GroupsController($container);
};

$container['PostsController'] = function ($container) {
    return new App\Controllers\PostsController($container);
};