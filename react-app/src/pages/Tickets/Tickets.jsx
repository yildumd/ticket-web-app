import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import TicketList from '../../components/tickets/TicketList'
import TicketForm from '../../components/tickets/TicketForm'
import { getTickets } from '../../services/tickets'
import './Tickets.css'

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showForm, setShowForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)

  const view = searchParams.get('view') || 'list'
  const create = searchParams.get('create')

  useEffect(() => {
    if (create === 'new') {
      setShowForm(true)
      setEditingTicket(null)
    }
  }, [create])

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const ticketsData = await getTickets()
      setTickets(ticketsData)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = () => {
    setShowForm(true)
    setEditingTicket(null)
    setSearchParams({ view: 'form' })
  }

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket)
    setShowForm(true)
    setSearchParams({ view: 'form' })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTicket(null)
    setSearchParams({})
    fetchTickets() // Refresh the list
  }

  const handleViewChange = (newView) => {
    setSearchParams({ view: newView })
  }

  if (loading) {
    return (
      <div className="tickets-loading">
        <div className="loading-spinner">Loading tickets...</div>
      </div>
    )
  }

  return (
    <div className="tickets-page">
      <div className="container">
        {/* Header */}
        <div className="tickets-header">
          <div className="header-content">
            <h1>Ticket Management</h1>
            <p>Create, view, and manage your support tickets</p>
          </div>
          <div className="header-actions">
            <div className="view-toggle">
              <button
                onClick={() => handleViewChange('list')}
                className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
              >
                List View
              </button>
              <button
                onClick={() => handleViewChange('grid')}
                className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
              >
                Grid View
              </button>
            </div>
            <button
              onClick={handleCreateTicket}
              className="btn btn-primary"
            >
              Create Ticket
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="tickets-content">
          {showForm ? (
            <TicketForm
              ticket={editingTicket}
              onClose={handleCloseForm}
              onSave={handleCloseForm}
            />
          ) : (
            <TicketList
              tickets={tickets}
              view={view}
              onEdit={handleEditTicket}
              onUpdate={fetchTickets}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Tickets