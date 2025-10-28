<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

use App\Core\Application;
use App\Core\Router;
use App\Core\Session;

// Start session
Session::start();

// Create application instance
$app = new Application();

// Define routes
$router = new Router();

// Public routes
$router->add('GET', '/', 'HomeController@index');
$router->add('GET', '/auth/login', 'AuthController@showLogin');
$router->add('POST', '/auth/login', 'AuthController@login');
$router->add('GET', '/auth/signup', 'AuthController@showSignup');
$router->add('POST', '/auth/signup', 'AuthController@signup');
$router->add('POST', '/auth/logout', 'AuthController@logout');

// Protected routes
$router->add('GET', '/dashboard', 'DashboardController@index', ['auth']);
$router->add('GET', '/tickets', 'TicketController@index', ['auth']);
$router->add('GET', '/tickets/create', 'TicketController@create', ['auth']);
$router->add('POST', '/tickets', 'TicketController@store', ['auth']);
$router->add('GET', '/tickets/{id}/edit', 'TicketController@edit', ['auth']);
$router->add('POST', '/tickets/{id}', 'TicketController@update', ['auth']);
$router->add('POST', '/tickets/{id}/delete', 'TicketController@delete', ['auth']);

// Set router and run application
$app->setRouter($router);
$app->run();