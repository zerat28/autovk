<?php
/**
 * Данный скрипт дергается cron-ом, выполняя автопостинг
 */

require __DIR__ . '/vendor/autoload.php';
$settings = require __DIR__ . '/bootstrap/settings.php';
$autopost_app = new \Slim\App($settings);
$container = $autopost_app->getContainer();
$container->register(new \App\Services\Database\EloquentServiceProvider());
$container->register(new \App\Services\Vk\VkServiceProvider());
$container->register(new \App\Services\Files\FilesServiceProvider());

use App\Models\User;
use App\Models\Post;

//Тянем из БД все посты, подходящие по дате
$current_date = date('Y-m-d H:i:s', time());
$posts = Post::where('datetime', '<=', $current_date)->get();

//Отправка постов
foreach ($posts as $post) {
    //Тянем  пользователя
    $user = User::where('id', $post->user_id)->first();
    //Отправка поста
    $send_post = $container->vk->sendPost($post, $user, $container->get('settings')['vk_methods'], $container->get('settings')['directories']['image_path']);

    if ($send_post->post_id) {
        $result = $post->del($post, $container->fw);
    }
    
    echo $result;
}
