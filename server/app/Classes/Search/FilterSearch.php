<?php

namespace App\Classes\Search;

use Illuminate\Database\Eloquent\Builder;

class FilterSearch
{

    public static function apply($filters, $model)
    {

        $model = $model->newQuery();
        //Посты текущего авторизованного пользователя
        $model->where('user_id', $_SESSION['user']);

        //Формируем запрос на выборку
        $query =
            static::applyDecoratorsFromRequest(
                $filters, $model
            );

        //Выполняем запрос и возвращаем результат
        return static::getResults($query);
    }

    /**
     * Формирование запроса
     * @param $request
     * @param Builder $query
     * @return Builder
     */
    private static function applyDecoratorsFromRequest($request, Builder $query)
    {
        foreach ($request->getQueryParams() as $filterName => $value) {

            $decorator = static::createFilterDecorator($filterName);

            //Кастомный фильтр
            if (static::isValidDecorator($decorator)) {
                $query = $decorator::apply($query, $value);
            } //Дефолтный
            else {
                $query = $query->where($filterName, $value);
            }

        }
        return $query;
    }

    /**
     * Определение пути до файла с фильтром
     * @param $name
     * @return string
     */
    private static function createFilterDecorator($name)
    {
        return __NAMESPACE__ . '\\Filters\\' .
            str_replace(' ', '',
                ucwords(str_replace('_', ' ', $name)));
    }

    /**
     * Проверка существования класса с фильтром
     * @param $decorator
     * @return bool
     */
    private static function isValidDecorator($decorator)
    {
        return class_exists($decorator);
    }

    /**
     * Полученпие результата
     * @param Builder $query
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    private static function getResults(Builder $query)
    {
        return $query->get();
    }


}