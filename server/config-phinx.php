<?php
$config = require __DIR__ . '/bootstrap/settings.php';
return [
    'paths' => [
        'migrations' => 'migrations'
    ],
    'migration_base_class' => '\App\Classes\Migration\Migration',
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_database' => 'dev',
        'dev' => [
            'adapter' => 'mysql',
            'host' => $config['settings']['database']['host'],
            'name' => $config['settings']['database']['database'],
            'user' => $config['settings']['database']['username'],
            'pass' => $config['settings']['database']['password'],
        ]
    ]
];