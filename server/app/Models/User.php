<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;

/** Модель пользователя
 * Class User
 * @package App\Models
 */
class User extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'email',
        'name',
        'password',
        'access_token'
    ];

    /**Обновить модель пользователя
     * @param $data
     * @return bool|string
     */
    public function upd($data)
    {
        //Заполнение объекта
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }

        //Сохранение объекта в бд
        try {
            return $this->save();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


}