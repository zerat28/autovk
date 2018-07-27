<?php

namespace App\Controllers;

use App\Models\User;

/**Контроллер сообществ
 * Class GroupsController
 * @package App\Controllers
 */
class GroupsController extends Controller
{

    /**Получить личные группы пользователя
     * @return mixed
     */
    public function getGroups($request, $response)
    {
        $groups = [];

        //Выборка пользователя
        $user = User::find($_SESSION['user']);

        //Тянем группы если пользователь найден
        if ($user) {
            $this->vk->setAccessToken($user->access_token);
            $groups = $this->vk->getGroups();
        }

        //Вернуть результат пользователю
       return  $this->sendResult(true, $groups, $response);
    }
}