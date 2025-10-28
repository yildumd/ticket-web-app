import React, { useState } from 'react'
import TicketCard from './TicketCard'
import './TicketList.css'

const TicketList = ({ tickets, view, onEdit, onUpdate }) => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = filter === 'all' || ticket.status === filter
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusCount = (status) => {
    return tickets.filter(ticket => ticket.status === status).length
  }

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3>No tickets yet</h3>
        <p>Create your first ticket to get started</p>
      </div>
    )
  }

  return (
    <div className="ticket-list">
      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="search-icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All ({tickets.length})
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`filter-btn ${filter === 'open' ? 'active' : ''}`}
          >
            Open ({getStatusCount('open')})
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
          >
            In Progress ({getStatusCount('in_progress')})
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`filter-btn ${filter === 'closed' ? 'active' : ''}`}
          >
            Closed ({getStatusCount('closed')})
          </button>
        </div>
      </div>

      {/* Tickets Grid/List */}
      <div className={`tickets-container ${view === 'grid' ? 'grid-view' : 'list-view'}`}>
        {filteredTickets.map(ticket => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            view={view}
            onEdit={onEdit}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="no-results">
          <p>No tickets found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default TicketList