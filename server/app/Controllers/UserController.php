<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\UserVk;

/** Контроллер  пользователя
 * Class UserController
 * @package App\Controllers
 */
class UserController extends Controller
{

    /**Получить данные пользователя
     * @return mixed
     */
    public function getUser($request, $response)
    {
        //Получаем текущего авторизованного пользователя
        $user = User::find($_SESSION['user']);

        //Если он синхронизрован с вк тянем данные о нем
        if (!empty($user->access_token)) {
            $this->vk->setAccessToken($user->access_token);
            $vk_user = $this->vk->getUser();
            $vk_user->name = $user->name;
            $vk_user->email = $user->email;
        }

        //Вернуть результат клиенту
        return $this->sendResult(true, isset($vk_user)? $vk_user : $user, $response);
    }


    /** обновить данные пользователя
     * @param $request
     * @param $response
     * @return string
     */
    public function updateUser($request, $response)
    {
        //Парсинг тела запроса
        $parsedBody = $request->getParsedBody();

        //Выборка пользователя
        $user = User::find($_SESSION['user']);

        //Обновление данных пользователя
        $result = $user->upd($parsedBody);

        //Вернуть результат клиенту
        return $this->sendResult($result, $user->id, $response);

    }
}