import React, { useState } from 'react'
import { deleteTicket } from '../../services/tickets'
import './TicketCard.css'

const TicketCard = ({ ticket, view, onEdit, onUpdate }) => {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) {
      return
    }

    setDeleting(true)
    try {
      await deleteTicket(ticket.id)
      onUpdate() // Refresh the ticket list
    } catch (error) {
      console.error('Error deleting ticket:', error)
      alert('Failed to delete ticket. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { label: 'Low', class: 'priority-low' },
      medium: { label: 'Medium', class: 'priority-medium' },
      high: { label: 'High', class: 'priority-high' }
    }
    
    const config = priorityConfig[priority] || priorityConfig.medium
    return (
      <span className={`priority-badge ${config.class}`}>
        {config.label}
      </span>
    )
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { label: 'Open', class: 'status-open' },
      in_progress: { label: 'In Progress', class: 'status-in-progress' },
      closed: { label: 'Closed', class: 'status-closed' }
    }
    
    const config = statusConfig[status] || statusConfig.open
    return (
      <span className={`status-badge ${config.class}`}>
        {config.label}
      </span>
    )
  }

  if (view === 'list') {
    return (
      <div className="ticket-card list-view">
        <div className="ticket-main">
          <div className="ticket-header">
            <h3 className="ticket-title">{ticket.title}</h3>
            <div className="ticket-badges">
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
            </div>
          </div>
          <p className="ticket-description">{ticket.description}</p>
          <div className="ticket-meta">
            <span>Created: {formatDate(ticket.createdAt)}</span>
            {ticket.updatedAt !== ticket.createdAt && (
              <span>Updated: {formatDate(ticket.updatedAt)}</span>
            )}
          </div>
        </div>
        <div className="ticket-actions">
          <button
            onClick={() => onEdit(ticket)}
            className="btn btn-secondary btn-small"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn btn-danger btn-small"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="ticket-card grid-view">
      <div className="ticket-header">
        <h3 className="ticket-title">{ticket.title}</h3>
        <div className="ticket-badges">
          {getStatusBadge(ticket.status)}
          {getPriorityBadge(ticket.priority)}
        </div>
      </div>
      <p className="ticket-description">{ticket.description}</p>
      <div className="ticket-meta">
        <div className="meta-item">
          <span className="meta-label">Created:</span>
          <span>{formatDate(ticket.createdAt)}</span>
        </div>
        {ticket.updatedAt !== ticket.createdAt && (
          <div className="meta-item">
            <span className="meta-label">Updated:</span>
            <span>{formatDate(ticket.updatedAt)}</span>
          </div>
        )}
      </div>
      <div className="ticket-actions">
        <button
          onClick={() => onEdit(ticket)}
          className="btn btn-secondary btn-small"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn btn-danger btn-small"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default TicketCard