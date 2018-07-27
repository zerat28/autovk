<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use DateTime;
use DateInterval;

/** Модель поста вк
 * Class Post
 * @package App\Models
 */
class Post extends Model
{
    protected $table = 'posts';

    protected $fillable = [
        'group_id',
        'user_id',
        'datetime'
    ];

    /** Добавление поста
     * @param $data
     * @param $fw
     * @param $request
     * @return bool|string
     */
    public function add($data, $key = null)
    {
        //Заполнение полей
        $this->img = $data->img;
        $this->text = $data->text;
        $this->group_id = $data->group_id;
        $this->datetime = date('Y-m-d H:i:s', strtotime($data->datetime));
        $this->user_id = $_SESSION['user'];

        //Изменение времени с учетом интервала
        if (isset($data->interval)) {
            $time = new DateTime($this->datetime);
            $time->add(new DateInterval('PT' . $data->interval * $key . 'M'));
            $this->datetime = $time->format('Y-m-d H:i:s');
        }

        //Сохранение объекта в бд
        try {
            return $this->save();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**Обновить модель поста
     * @param $data
     * @return bool|string
     */
    public function upd($data)
    {
        //Заполнение объекта
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }

        $this->datetime = date('Y-m-d H:i:s', strtotime($data['datetime']));

        //Сохранение объекта в бд
        try {
            return $this->save();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**Удаление поста
     * @param $post
     * @param $fw
     * @return string
     */
    public function del($post, $fw)
    {
        //Удаление записи о посте из БД
        try {
            $del = $post->delete();
            //Удаление изображения, связанного с постом
            if (isset($post->img)) {
                try {
                    $fw->remove($post->img, 'image_path');
                } catch (Exception $e) {
                    return $e->getMessage();
                }
            }
            return $del;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

}