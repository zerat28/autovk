<?php

namespace App\Classes\Search\Filters;

use Illuminate\Database\Eloquent\Builder;

class DateEnd implements Filter
{

    public static function apply(Builder $builder, $value)
    {
        $date_end = date('Y-m-d H:i:s', strtotime($value));
        return $builder->where('datetime', '<=', $date_end);
    }
}