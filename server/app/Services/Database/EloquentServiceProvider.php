<?php

namespace App\Services\Database;

use Illuminate\Database\Capsule\Manager;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class EloquentServiceProvider implements ServiceProviderInterface
{
    public function register(Container $pimple)
    {
        $capsule = new Manager();
        $config = $pimple['settings']['database'];
        $capsule->addConnection([
            'driver' => $config['driver'],
            'host' => $config['host'],
            'database' => $config['database'],
            'username' => $config['username'],
            'password' => $config['password'],
            'charset' => $config['charset'],
            'collation' => $config['collation'],
            'prefix' => $config['prefix']
        ]);

        $capsule->setAsGlobal();
        $capsule->bootEloquent();
        $pimple['db'] = function ($c) use ($capsule) {
            return $capsule;
        };
    }
}