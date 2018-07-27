<?php

namespace App\Services\Files;

use Interop\Container\ContainerInterface;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class FilesServiceProvider implements ServiceProviderInterface
{
    public function register(Container $pimple)
    {
        $pimple['fw'] = function (ContainerInterface $c) {
            return new Files($c->get('settings')['directories']);
        };
    }
}