<?php

namespace App\Classes\Migration;

use Illuminate\Database\Capsule\Manager as Capsule;
use Phinx\Migration\AbstractMigration;

class Migration extends AbstractMigration
{
    /** @var \Illuminate\Database\Capsule\Manager $capsule */
    public $capsule;
    /** @var \Illuminate\Database\Schema\Builder $capsule */
    public $schema;

    public function init()
    {
        $config = require __DIR__ . '/../../../bootstrap/settings.php';
        $this->capsule = new Capsule;
        $this->capsule->addConnection([
            'driver' => $config['settings']['database']['driver'],
            'host' => $config['settings']['database']['host'],
            'database' => $config['settings']['database']['database'],
            'username' => $config['settings']['database']['username'],
            'password' => $config['settings']['database']['password'],
            'charset' => $config['settings']['database']['charset'],
            'collation' => $config['settings']['database']['collation'],
            'prefix' => $config['settings']['database']['prefix']
        ]);

        $this->capsule->bootEloquent();
        $this->capsule->setAsGlobal();
        $this->schema = $this->capsule->schema();
    }
}