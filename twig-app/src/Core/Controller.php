<?php

namespace App\Core;

use Symfony\Component\HttpFoundation\Response;

class Controller
{
    protected $twig;

    public function __construct()
    {
        global $app;
        $this->twig = $app->getTwig();
    }

    protected function render($view, $data = [])
    {
        $content = $this->twig->render($view, $data);
        return new Response($content);
    }

    protected function redirect($url)
    {
        return new Response('', 302, ['Location' => $url]);
    }

    protected function json($data)
    {
        return new Response(json_encode($data), 200, [
            'Content-Type' => 'application/json'
        ]);
    }
}