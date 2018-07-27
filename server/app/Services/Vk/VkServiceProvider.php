<?php

namespace App\Services\Vk;

use Interop\Container\ContainerInterface;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class VkServiceProvider implements ServiceProviderInterface
{
    public function register(Container $pimple)
    {
        $pimple['vk'] = function (ContainerInterface $c) {
            $vk = new Vk($c->get('settings')['vkauth']);
            //Установка базовых url для авторизации и запросов к api
            $vk->setTokenUrl($c->get('settings')['remote_urls']['oauth'] . $c->get('settings')['vk_methods']['token']);
            $vk->setAuthUrl($c->get('settings')['remote_urls']['oauth'] . $c->get('settings')['vk_methods']['auth']);
            $vk->setApiUrl($c->get('settings')['remote_urls']['api']);
            $vk->setMethods($c->get('settings')['vk_methods']);
            return $vk;
        };
    }
}