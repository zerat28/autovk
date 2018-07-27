<?php
defined('DS') ?: define('DS', DIRECTORY_SEPARATOR);
defined('ROOT') ?: define('ROOT', dirname(__DIR__) . DS);
if (file_exists(ROOT . '.env')) {
    $dotenv = new Dotenv\Dotenv(ROOT);
    $dotenv->load();
}
return [
    'settings' => [
        'displayErrorDetails' => getenv('APP_DEBUG') === 'true' ? true : false,
        'addContentLengthHeader' => false,
        'app' => [
            'name' => getenv('APP_NAME'),
            'url' => getenv('APP_URL'),
            'env' => getenv('APP_ENV'),
            'csrf_key' => getenv('CSRF_SECRET_KEY')
        ],
        'renderer' => [
            'template_path' => __DIR__ . '/../resources/views/',
            'template_path_index' => __DIR__ . '/../public/ats/'
        ],
        'database' => [
            'driver' => getenv('DB_CONNECTION'),
            'host' => getenv('DB_HOST'),
            'database' => getenv('DB_DATABASE'),
            'username' => getenv('DB_USERNAME'),
            'password' => getenv('DB_PASSWORD'),
            'port' => getenv('DB_PORT'),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
        ],

        'vkauth' => [
            'client_id' => getenv('VK_CLIENT_ID'),
            'client_secret' => getenv('VK_CLIENT_SECRET'),
            'redirect_uri' => 'http://vk.com/blank.html',
            'response_type' => 'code',
            'display' => 'popup',
            'v' => '5.73'
        ],

        'remote_urls' => [
            'oauth' => 'https://oauth.vk.com/',
            'api' => 'https://api.vk.com/method/'
        ],

        'vk_methods' => [
            'auth' => 'authorize',
            'token' => 'access_token',
            'user' => 'users.get',
            'groups' => 'groups.get',
            'photo_upload_server' => 'photos.getWallUploadServer',
            'photo_save' => 'photos.saveWallPhoto',
            'wp' => 'wall.post'
        ],

        'directories' => [
            'image_path' => __DIR__ . '/../tmp/images/',
            'others_path' => __DIR__ . '/../tmp/others/',
        ],

        'cors' => null !== getenv('CORS_ALLOWED_ORIGINS') ? getenv('CORS_ALLOWED_ORIGINS') : '*',
    ]
];