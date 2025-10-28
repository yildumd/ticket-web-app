<?php

namespace App\Core;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Router
{
    protected $routes = [];

    public function add($method, $path, $handler, $middleware = [])
    {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $handler,
            'middleware' => $middleware
        ];
    }

    public function dispatch(Request $request)
    {
        $path = $request->getPathInfo();
        $method = $request->getMethod();

        foreach ($this->routes as $route) {
            $pattern = $this->convertToRegex($route['path']);
            
            if (preg_match($pattern, $path, $matches) && $route['method'] === $method) {
                array_shift($matches); // Remove full match

                // Check middleware
                foreach ($route['middleware'] as $middleware) {
                    if ($middleware === 'auth' && !$this->checkAuth()) {
                        return new Response('', 302, ['Location' => '/auth/login']);
                    }
                }

                // Parse controller and method
                list($controllerName, $methodName) = explode('@', $route['handler']);
                $controllerClass = "App\\Controllers\\{$controllerName}";

                if (class_exists($controllerClass)) {
                    $controller = new $controllerClass();
                    return call_user_func_array([$controller, $methodName], $matches);
                }
            }
        }

        return new Response('Page not found', 404);
    }

    private function convertToRegex($path)
    {
        $pattern = preg_replace('/\{([a-z]+)\}/', '([^/]+)', $path);
        return '#^' . $pattern . '$#';
    }

    private function checkAuth()
    {
        return isset($_SESSION['user']);
    }
}