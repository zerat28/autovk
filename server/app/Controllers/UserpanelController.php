<?php

namespace App\Controllers;


/**Контроллер лк пользователя
 * Class UserpanelController
 * @package App\Controllers
 */
class UserpanelController extends Controller
{

    /** Открытие ЛК пользователя
     * @param $request
     * @param $response
     * @return mixed
     */
    public function index($request, $response)
    {
        return $this->view_index->render($response, 'index.html');

    }
}