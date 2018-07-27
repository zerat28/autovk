<?php

namespace App\Services\Auth;

use App\Models\User;

class Auth
{
    /** Проверка учетки пользователя(авторизация)
     * @param $email
     * @param $password
     * @return bool
     */
    public function attempt($email, $password)
    {

        $user = User::where('email', $email)->first();

        if (!$user) {
            return false;
        }

        if (password_verify($password, $user->password)) {

            $_SESSION['user'] = $user->id;
            return true;
        }

        return false;

    }

    /** Проверка авторизован ли пользователь
     * @return bool
     */
    public function check()
    {
        return isset($_SESSION['user']);
    }

    /**
     * Разлогинить пользователя
     */
    public function logout(){
        unset($_SESSION['user']);
    }
}