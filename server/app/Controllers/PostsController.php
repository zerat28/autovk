<?php

namespace App\Controllers;

use App\Models\Post;
use App\Classes\Search\FilterSearch;
use App\Models\User;

/** Контроллер постов
 * Class PostsController
 * @package App\Controllers
 */
class PostsController extends Controller
{

    /**
     * Получить посты
     * @param $request
     * @param $response
     * @return string
     */
    public function getPosts($request, $response)
    {
        $post = new Post();
        //Фильтр постов по параметрам
        $posts = FilterSearch::apply($request,$post);
        //Вернуть результат клиенту
        return json_encode($posts);
    }


    /** Добавить пост
     * @param $request
     * @param $response
     * @return string
     */
    public function addPost($request, $response)
    {

        //Объект поста
        $post = new Post();

        //Парсинг тела запроса
        $parsedBody = $request->getParsedBody();

        //upload изображения
        $post->img = $this->fw->upload($request, 'image_path') ?: null;

        //Добавить пост
        $result = $post->add(json_decode($parsedBody['data']));


        //Вернуть результат клиенту
        return $this->sendResult($result, $post, $response);
    }

    public function massAddPost($request, $response)
    {

        //Парсинг тела запроса
        $parsedBody = $request->getParsedBody();

        //upload архива
        $zip = $this->fw->upload($request, 'others_path') ?: null;

        //Распаковка архива
        $images = $this->fw->unzip($zip, 'others_path', 'image_path', ['jpg', 'jpeg', 'png', 'gif']);

        $results = [];

        //Добавление постов
        foreach ($images as $key => $img) {
            $post = new Post();
            $post->img = $img;
            $results[] = $post->add(json_decode($parsedBody['data']), $key);
        }

        return $this->sendResult(true, $results, $response);

    }


    /** обновить данные поста
     * @param $request
     * @param $response
     * @return string
     */
    public function updatePost($request, $response)
    {
        //Парсинг тела запроса
        $parsedBody = $request->getParsedBody();

        //Выборка пользователя
        $post = Post::find($parsedBody['id']);

        //Обновление данных пользователя
        $result = $post->upd($parsedBody);

        //Вернуть результат клиенту
        return $this->sendResult($result, $post->id, $response);

    }

    /**
     * Удаление поста
     * @param $request
     * @param $response
     * @param $args
     * @return mixed
     */
    public function delPost($request, $response, $args)
    {
        if ($args['id']) {

            //Поиск удаляемого поста
            $post = Post::find($args['id']);
            if (!$post) {
                return $response->withJson('deleted error: not found object', 400);
            }

            //удалить пост
            $result = $post->del($post, $this->fw);


            //Вернуть результат клиенту
            return $this->sendResult($result, $post, $response);

        }

    }


    /**Отправить пост на стену ВК
     * @param $request
     * @param $response
     * @return mixed
     */
    public function sendPost($request, $response)
    {
        //Парсинг тела запроса
        $parsedBody = $request->getParsedBody();

        //Тянем текущего пользователя и пост
        $user = User::find($_SESSION['user']);

        //Отправка поста
        $send_post = $this->vk->sendPost($parsedBody, $user, $this->settings['vk_methods'], $this->img_path);

        $result = $send_post->post_id ? true : false;

        //Вернуть результат клиенту
        return $this->sendResult($result, $send_post, $response);
    }

}