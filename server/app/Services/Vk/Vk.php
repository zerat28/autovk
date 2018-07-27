<?php

namespace App\Services\Vk;

use CURLFile;


class Vk
{
    /**
     * @var Версия API
     */
    private $version;

    /**
     * @var Id приложения через которое выполняются все действия
     */
    private $clientId;

    /**
     * @var Секретный ключ приложения
     */
    private $secret;

    /**
     * @var array Права доступа
     */
    private $scope;

    /**
     * @var Адрес перенаправления
     */
    private $redirectUri;

    /**
     * @var Тип ответа
     */
    private $responseType;

    /**
     * @var Тип окна авторизации от вк
     */
    private $display;

    /**
     * @var Url, на который отправляется запрос получения токена
     */
    private $token_url;

    /**
     * @var Url vkAPI
     */
    private $api_url;

    /**
     * @var Url авторизации
     */
    private $auth_url;

    /**
     * @var Токен доступа
     */
    private $accessToken;

    /**
     * @var Методы VK API
     */
    private $methods;


    public function __construct(array $config)
    {
        if (isset($config['client_id'])) {
            $this->setClientId($config['client_id']);
        }
        if (isset($config['client_secret'])) {
            $this->setSecret($config['client_secret']);
        }
        if (isset($config['scope'])) {
            $this->setScope($config['scope']);
        }
        if (isset($config['redirect_uri'])) {
            $this->setRedirectUri($config['redirect_uri']);
        }
        if (isset($config['response_type'])) {
            $this->setResponceType($config['response_type']);
        }
        if (isset($config['v'])) {
            $this->setVersion($config['v']);
        }
        if (isset($config['display'])) {
            $this->setDisplay($config['display']);
        }
    }

    public function setAccessToken($access_token)
    {
        $this->accessToken = $access_token;
    }

    public function setAuthUrl($url)
    {
        $this->auth_url = $url;
    }

    public function getAuthUrl()
    {
        return $this->auth_url;
    }

    public function setClientId($client_id)
    {
        $this->clientId = $client_id;
    }

    public function setSecret($client_secret)
    {
        $this->secret = $client_secret;
    }

    public function setScope($scope)
    {
        $this->scope = $scope;
    }

    public function setRedirectUri($redirect_uri)
    {
        $this->redirectUri = $redirect_uri;
    }

    public function getRedirectUri()
    {
        return $this->redirectUri;
    }

    public function setResponceType($response_type)
    {
        $this->responseType = $response_type;
    }

    public function setVersion($v)
    {
        $this->version = $v;
    }

    public function setDisplay($display)
    {
        $this->display = $display;
    }

    public function setTokenUrl($url)
    {
        $this->token_url = $url;
    }

    public function setApiUrl($url)
    {
        $this->api_url = $url;
    }

    public function setMethods($methods)
    {
        $this->methods = $methods;
    }

    /**
     * Формирование запросов к методам api
     * @param $method
     * @param array $query
     * @return mixed
     * @throws \Exception
     */
    public function api($method, $params)
    {
        $url = $this->createLink($params, $this->api_url . $method);
        $result = json_decode($this->curl($url));

        if (isset($result->response)) {
            return $result->response;
        }
        return $result;
    }

    /**
     * Аутентификация в вк, получение токена доступа
     * @param null $code
     * @return mixed
     * @throws \Exception
     */
    public function authenticate($code = NULL)
    {
        $url = $this->createLink(
            [
                'code' => $code,
                'scope' => $this->scope
            ], $this->token_url);

        $token = $this->curl($url);
        $data = json_decode($token);
        return $data;
    }

    /** Генерация линка авторизации
     * @param null $params
     * @param null $base_url
     * @return string
     */
    public function createLink($params = null, $base_url = null)
    {
        //Дефолтные параметры
        $url_params = [
            'client_id' => $this->clientId,
            'client_secret' => $this->secret,
            'redirect_uri' => $this->redirectUri,
            'v' => $this->version,
        ];

        //Кастомные параметры
        if ($params) {
            foreach ($params as $key => $value) {
                $url_params[$key] = $value;
            }
        }

        $url = $base_url . '?' . http_build_query($url_params);
        return $url;
    }

    /**Отправка изображения на сервер вк
     * @param $url
     * @param $path
     * @return mixed
     * @throws \Exception
     */
    public function sendPhoto($url, $path)
    {

        $post = array('photo' => new CURLFile($path));
        $result = json_decode($this->curl($url, $post));
        return $result;

    }


    /**Отправка поста
     * @param $data
     * @param $user
     * @param $methods
     * @param $img_path
     * @return mixed
     * @throws \Exception
     */
    public function sendPost($data, $user, $methods, $img_path)
    {
        $upload_server = $this->api($methods['photo_upload_server'], [
            'group_id' => $data['group_id'],
            'access_token' => $user['access_token']
        ]);

        if (isset($upload_server->upload_url) && isset($data['img'])) {
            $upload_result = $this->sendPhoto($upload_server->upload_url, $img_path . $data['img'], $upload_server->upload_url);
        }

        if (isset($upload_result->photo)) {
            $save_photo = $this->api($methods['photo_save'], [
                'group_id' => $data['group_id'],
                'access_token' => $user['access_token'],
                'photo' => $upload_result->photo,
                'hash' => $upload_result->hash,
                'server' => $upload_result->server
            ]);

            $save_photo = array_shift($save_photo);
        }

        $send_post = $this->api($methods['wp'], [
            'owner_id' => -$data['group_id'],
            'access_token' => $user['access_token'],
            'from_group' => 1,
            'message' => $data['text'],
            'attachments' => 'photo' . $save_photo->owner_id . '_' . $save_photo->id
        ]);

        return $send_post;
    }

    /**Получить данные о пользователе ВК
     * @return mixed
     * @throws \Exception
     */
    public function getUser()
    {
        $user = $this->api($this->methods['user'], [
            'fields' => 'uid,first_name,last_name,photo_200,counters,bdate',
            'access_token' => $this->accessToken
        ]);
        if (!empty($user)) {
            $user = array_shift($user);
            $user->is_sync = true;
        }

        return $user;
    }

    /**Получить данные о сообществах пользователя
     * @return array|mixed
     * @throws \Exception
     */
    public function getGroups()
    {
        $groups = $this->api($this->methods['groups'], [
            'filter' => 'admin',
            'extended' => '1',
            'fields' => 'counters,members_count',
            'access_token' => $this->accessToken,
        ]);

        $groups = $groups->items ?: [];

        return $groups;
    }

    /** Отправка запроса curl-ом
     * @param $url
     * @param null $post
     * @return mixed
     * @throws \Exception
     */
    protected function curl($url, $post = null)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        if (!empty($post)) {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
        }

        $result = curl_exec($ch);

        if (!$result) {
            $errno = curl_errno($ch);
            $error = curl_error($ch);
        }

        curl_close($ch);

        if (isset($errno) && isset($error)) {
            throw new \Exception($error, $errno);
        }

        return $result;
    }


}