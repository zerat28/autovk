<?php

namespace App\Controllers;

/**Контроллер csrf токена
 * Class TokenController
 * @package App\Controllers
 */

class TokenController extends Controller
{
    public function getToken($request, $response)
    {
        //объект csrf
        $csrf = $this->container['csrf'];

        //Отправка токена клиенту
        return $this->sendResult(true, ['value' => $csrf->getToken()], $response);

    }
}