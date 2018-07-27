<?php

namespace App\Classes\Search\Filters;

use Illuminate\Database\Eloquent\Builder;

class Group implements Filter
{

    public static function apply(Builder $builder, $value)
    {
        return $builder->where('group_id', $value);
    }
}