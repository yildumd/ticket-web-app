<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Session;
use App\Models\User;

class AuthController extends Controller
{
    public function showLogin()
    {
        if (Session::get('user')) {
            return $this->redirect('/dashboard');
        }
        
        return $this->render('auth/login.twig', [
            'error' => Session::getFlash('error')
        ]);
    }

    public function login()
    {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        // Mock authentication - in real app, use proper password hashing
        if ($email === 'test@example.com' && $password === 'password123') {
            Session::set('user', [
                'id' => 1,
                'name' => 'Test User',
                'email' => $email
            ]);
            
            return $this->redirect('/dashboard');
        }

        Session::flash('error', 'Invalid email or password');
        return $this->redirect('/auth/login');
    }

    public function showSignup()
    {
        if (Session::get('user')) {
            return $this->redirect('/dashboard');
        }
        
        return $this->render('auth/signup.twig', [
            'error' => Session::getFlash('error')
        ]);
    }

    public function signup()
    {
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirmPassword'] ?? '';

        // Validation
        if (empty($name) || empty($email) || empty($password)) {
            Session::flash('error', 'All fields are required');
            return $this->redirect('/auth/signup');
        }

        if ($password !== $confirmPassword) {
            Session::flash('error', 'Passwords do not match');
            return $this->redirect('/auth/signup');
        }

        if (strlen($password) < 6) {
            Session::flash('error', 'Password must be at least 6 characters');
            return $this->redirect('/auth/signup');
        }

        // Create user (in real app, hash the password)
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = $password; // In real app: password_hash($password, PASSWORD_DEFAULT)
        $user->save();

        Session::set('user', [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ]);

        return $this->redirect('/dashboard');
    }

    public function logout()
    {
        Session::destroy();
        return $this->redirect('/');
    }
}