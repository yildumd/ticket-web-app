<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Ticket;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = Ticket::getStats();
        
        return $this->render('dashboard.twig', [
            'stats' => $stats
        ]);
    }
}