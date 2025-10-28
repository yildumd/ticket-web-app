<?php

namespace App\Models;

class Ticket
{
    public $id;
    public $title;
    public $description;
    public $status;
    public $priority;
    public $created_at;
    public $updated_at;
    public $created_by;

    public static function find($id)
    {
        $tickets = self::all();
        foreach ($tickets as $ticket) {
            if ($ticket->id == $id) {
                return $ticket;
            }
        }
        return null;
    }

    public static function all()
    {
        $ticketsData = json_decode(file_get_contents(self::getStoragePath()), true) ?? [];
        $tickets = [];
        
        foreach ($ticketsData as $data) {
            $ticket = new self();
            $ticket->id = $data['id'];
            $ticket->title = $data['title'];
            $ticket->description = $data['description'] ?? '';
            $ticket->status = $data['status'];
            $ticket->priority = $data['priority'] ?? 'medium';
            $ticket->created_at = $data['created_at'];
            $ticket->updated_at = $data['updated_at'];
            $ticket->created_by = $data['created_by'];
            $tickets[] = $ticket;
        }
        
        // Sort by latest first
        usort($tickets, function($a, $b) {
            return strtotime($b->created_at) - strtotime($a->created_at);
        });
        
        return $tickets;
    }

    public function save()
    {
        $tickets = self::all();
        
        if (!$this->id) {
            $this->id = time();
            $this->created_at = date('Y-m-d H:i:s');
            $this->updated_at = date('Y-m-d H:i:s');
            $tickets[] = $this;
        } else {
            foreach ($tickets as $key => $ticket) {
                if ($ticket->id == $this->id) {
                    $this->updated_at = date('Y-m-d H:i:s');
                    $tickets[$key] = $this;
                    break;
                }
            }
        }

        $this->saveToFile($tickets);
        return $this;
    }

    public function delete()
    {
        $tickets = self::all();
        $newTickets = array_filter($tickets, function($ticket) {
            return $ticket->id != $this->id;
        });
        
        $this->saveToFile(array_values($newTickets));
    }

    private function saveToFile($tickets)
    {
        $data = [];
        foreach ($tickets as $ticket) {
            $data[] = [
                'id' => $ticket->id,
                'title' => $ticket->title,
                'description' => $ticket->description,
                'status' => $ticket->status,
                'priority' => $ticket->priority,
                'created_at' => $ticket->created_at,
                'updated_at' => $ticket->updated_at,
                'created_by' => $ticket->created_by
            ];
        }
        
        file_put_contents(self::getStoragePath(), json_encode($data));
    }

    private static function getStoragePath()
    {
        $path = dirname(__DIR__) . '/../storage/tickets.json';
        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0777, true);
        }
        if (!file_exists($path)) {
            file_put_contents($path, '[]');
        }
        return $path;
    }

    public static function getStats()
    {
        $tickets = self::all();
        $total = count($tickets);
        $open = count(array_filter($tickets, function($ticket) {
            return $ticket->status === 'open';
        }));
        $inProgress = count(array_filter($tickets, function($ticket) {
            return $ticket->status === 'in_progress';
        }));
        $closed = count(array_filter($tickets, function($ticket) {
            return $ticket->status === 'closed';
        }));

        return compact('total', 'open', 'inProgress', 'closed');
    }
}