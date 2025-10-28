<?php

namespace App\Core;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Application
{
    protected $router;
    protected $twig;

    public function __construct()
    {
        $this->setupTwig();
    }

    public function setRouter(Router $router)
    {
        $this->router = $router;
    }

    public function run()
    {
        $request = Request::createFromGlobals();
        
        try {
            $response = $this->router->dispatch($request);
        } catch (\Exception $e) {
            $response = new Response('Page not found', 404);
        }

        $response->send();
    }

    private function setupTwig()
    {
        $loader = new \Twig\Loader\FilesystemLoader(dirname(__DIR__) . '/../templates');
        $this->twig = new \Twig\Environment($loader, [
            'cache' => dirname(__DIR__) . '/../cache',
            'auto_reload' => true
        ]);

        // Add global variables
        $this->twig->addGlobal('session', $_SESSION);
    }

    public function getTwig()
    {
        return $this->twig;
    }
}