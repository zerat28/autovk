**Autoposting in vk**

This is a simple Autoposting project used Slim3 framework for server api and Angular5 for client side.

In this project implemented: registration, authorization, csrf token protected, migrations, Eloquent ORM and VKAPI Service.

**Run it:**

1) Put the repo on your server

2) $ cd autovk/server

3) Create .env file with your settings: $ cp .env_template .env

4) Get composer dependencies: $ php composer.phar install

5) Migrations: $ php vendor/bin/phinx migrate -c config-phinx.php

6) Install gulp for landing page:

    a) Go to public directory: $ cd public
    
    b) Get npm dependencies : $ npm install
    
    c) Run Gulp : $ gulp
    
7) Compile client for prod:

    a) Go to directory with client source files: $ cd autovk/client 
    
    b) Get npm dependencies : $ npm install
    
    c) Build client files with angular-cli: $ ng build --prod (default destination path for client files:"server/public/ats")
    
8) Compile client for dev: $ ng serve --proxy-config proxy.conf.json (Change your server address in proxy.conf.json) and browse to http://localhost:4200 after authorization


9) Run server/autopost.php with Сron to automatically send posts

**Key directories**

client: Client source files

client/src/app: Client application code

client/node_modules: npm dependencies

server: Server source files

server/app: Server application code

server/resources/views/: Twig template files

server/public: Webserver root

server/vendor: Composer dependencies

server/migrations: Migrations

**Key files**

server/public/index.php: Entry point to application

server/.env_template: Configuration template

server/config-phinx.php: Configuration migrations

server/autopost.php: Run this file with Cron (send posts to VK)

client/proxy.conf.json: Address your server for proxying requests from client(in dev mode)