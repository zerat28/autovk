<?php

use \App\Classes\Migration\Migration;

class DbStructure extends Migration
{
    public function up()
    {

        $this->schema->create('users', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->string('access_token')->nullable();
            $table->timestamps();
        });

        $this->schema->create('posts', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->increments('id');
            $table->integer('group_id');
            $table->integer('user_id');
            $table->string('text')->nullable();
            $table->string('img')->nullable();
            $table->timestamp('datetime')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('users');
        $this->schema->drop('posts');
    }
}
