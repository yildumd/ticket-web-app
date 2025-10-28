import React, { useState, useEffect } from 'react'
import { createTicket, updateTicket } from '../../services/tickets'
import './TicketForm.css'

const TicketForm = ({ ticket, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const isEditing = !!ticket

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority || 'medium'
      })
    }
  }, [ticket])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }

    if (!formData.status) {
      newErrors.status = 'Status is required'
    } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Invalid status value'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      if (isEditing) {
        await updateTicket(ticket.id, formData)
      } else {
        await createTicket(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving ticket:', error)
      setErrors({ submit: 'Failed to save ticket. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ticket-form-container">
      <div className="ticket-form-header">
        <h2>{isEditing ? 'Edit Ticket' : 'Create New Ticket'}</h2>
        <button
          onClick={onClose}
          className="close-btn"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="ticket-form">
        {errors.submit && (
          <div className="error-banner">
            {errors.submit}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter ticket title"
          />
          {errors.title && (
            <div className="error-message">{errors.title}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="form-input"
            placeholder="Enter ticket description (optional)"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`form-input ${errors.status ? 'error' : ''}`}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && (
              <div className="error-message">{errors.status}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Ticket' : 'Create Ticket')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TicketForm