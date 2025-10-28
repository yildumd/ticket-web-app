<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Session;
use App\Models\Ticket;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::all();
        
        return $this->render('tickets/index.twig', [
            'tickets' => $tickets,
            'success' => Session::getFlash('success'),
            'error' => Session::getFlash('error')
        ]);
    }

    public function create()
    {
        return $this->render('tickets/create.twig', [
            'error' => Session::getFlash('error')
        ]);
    }

    public function store()
    {
        $title = $_POST['title'] ?? '';
        $description = $_POST['description'] ?? '';
        $status = $_POST['status'] ?? 'open';
        $priority = $_POST['priority'] ?? 'medium';

        // Validation
        if (empty($title)) {
            Session::flash('error', 'Title is required');
            return $this->redirect('/tickets/create');
        }

        if (!in_array($status, ['open', 'in_progress', 'closed'])) {
            Session::flash('error', 'Invalid status');
            return $this->redirect('/tickets/create');
        }

        $ticket = new Ticket();
        $ticket->title = $title;
        $ticket->description = $description;
        $ticket->status = $status;
        $ticket->priority = $priority;
        $ticket->created_by = Session::get('user')['email'];
        $ticket->save();

        Session::flash('success', 'Ticket created successfully');
        return $this->redirect('/tickets');
    }

    public function edit($id)
    {
        $ticket = Ticket::find($id);
        
        if (!$ticket) {
            Session::flash('error', 'Ticket not found');
            return $this->redirect('/tickets');
        }

        return $this->render('tickets/edit.twig', [
            'ticket' => $ticket,
            'error' => Session::getFlash('error')
        ]);
    }

    public function update($id)
    {
        $ticket = Ticket::find($id);
        
        if (!$ticket) {
            Session::flash('error', 'Ticket not found');
            return $this->redirect('/tickets');
        }

        $title = $_POST['title'] ?? '';
        $description = $_POST['description'] ?? '';
        $status = $_POST['status'] ?? 'open';
        $priority = $_POST['priority'] ?? 'medium';

        // Validation
        if (empty($title)) {
            Session::flash('error', 'Title is required');
            return $this->redirect("/tickets/{$id}/edit");
        }

        if (!in_array($status, ['open', 'in_progress', 'closed'])) {
            Session::flash('error', 'Invalid status');
            return $this->redirect("/tickets/{$id}/edit");
        }

        $ticket->title = $title;
        $ticket->description = $description;
        $ticket->status = $status;
        $ticket->priority = $priority;
        $ticket->save();

        Session::flash('success', 'Ticket updated successfully');
        return $this->redirect('/tickets');
    }

    public function delete($id)
    {
        $ticket = Ticket::find($id);
        
        if ($ticket) {
            $ticket->delete();
            Session::flash('success', 'Ticket deleted successfully');
        } else {
            Session::flash('error', 'Ticket not found');
        }

        return $this->redirect('/tickets');
    }
}