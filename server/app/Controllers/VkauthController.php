<?php

namespace App\Controllers;

use App\Models\User;

/**Контроллер авторизации вк
 * Class VkauthController
 * @package App\Controllers
 */

class VkauthController extends Controller
{

    /**Получить ссылку на авторизацию через вк
     * @param $request
     * @param $response
     * @return mixed
     */
    public function getLink($request, $response)
    {
        //Генерация линка
        $url = $this->vk->CreateLink([
            'scope' => 'groups,wall,photos,offline',
            'response_type' => 'token'
        ], $this->vk->getAuthUrl());

        //Вернуть результат клиенту
        return $this->sendResult(true, $url, $response);
    }

    /**Сохранение токена доступа к вк
     * @param $request
     * @param $response
     * @return mixed
     */
    public function setToken($request, $response)
    {
        //Парсинг тела запроса
        $parsedBody = $request->getParsedBody();

        //Выборка пользователя
        $user = User::find($_SESSION['user']);

        //Сохранить токен
        $result = $user->upd($parsedBody);

        //Вернуть результат клиенту
        return $this->sendResult($result, $user->id, $response);
    }
}