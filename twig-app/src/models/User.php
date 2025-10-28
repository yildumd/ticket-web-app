<?php

namespace App\Models;

class User
{
    public $id;
    public $name;
    public $email;
    public $password;

    public static function find($id)
    {
        $users = self::all();
        foreach ($users as $user) {
            if ($user->id == $id) {
                return $user;
            }
        }
        return null;
    }

    public static function findByEmail($email)
    {
        $users = self::all();
        foreach ($users as $user) {
            if ($user->email === $email) {
                return $user;
            }
        }
        return null;
    }

    public static function all()
    {
        $usersData = json_decode(file_get_contents(self::getStoragePath()), true) ?? [];
        $users = [];
        
        foreach ($usersData as $data) {
            $user = new self();
            $user->id = $data['id'];
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = $data['password'];
            $users[] = $user;
        }
        
        return $users;
    }

    public function save()
    {
        $users = self::all();
        
        if (!$this->id) {
            $this->id = time();
            $users[] = $this;
        } else {
            foreach ($users as $key => $user) {
                if ($user->id == $this->id) {
                    $users[$key] = $this;
                    break;
                }
            }
        }

        $this->saveToFile($users);
        return $this;
    }

    private function saveToFile($users)
    {
        $data = [];
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'password' => $user->password
            ];
        }
        
        file_put_contents(self::getStoragePath(), json_encode($data));
    }

    private static function getStoragePath()
    {
        $path = dirname(__DIR__) . '/../storage/users.json';
        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0777, true);
        }
        return $path;
    }
}