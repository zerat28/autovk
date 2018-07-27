<?php

namespace App\Classes\Search\Filters;

use Illuminate\Database\Eloquent\Builder;

class DateStart implements Filter
{

    public static function apply(Builder $builder, $value)
    {
        $date_start = date('Y-m-d H:i:s', strtotime($value));
        return $builder->where('datetime','>=', $date_start);
    }
}