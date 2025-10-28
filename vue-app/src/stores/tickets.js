import { defineStore } from 'pinia'
import { ref } from 'vue'

// Mock data for tickets
const getStoredTickets = () => {
  return JSON.parse(localStorage.getItem('ticketapp_tickets')) || [
    {
      id: 1,
      title: 'Login issue on mobile app',
      description: 'Users are unable to login through the mobile application on iOS devices.',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      createdBy: 'test@example.com'
    },
    {
      id: 2,
      title: 'Update user profile page',
      description: 'The user profile page needs to be updated with new design and additional fields.',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-16T09:15:00Z',
      createdBy: 'test@example.com'
    },
    {
      id: 3,
      title: 'Password reset email not sending',
      description: 'Customers report not receiving password reset emails.',
      status: 'closed',
      priority: 'high',
      createdAt: '2024-01-10T08:45:00Z',
      updatedAt: '2024-01-12T16:30:00Z',
      createdBy: 'test@example.com'
    }
  ]
}

const saveTickets = (tickets) => {
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
}

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref([])
  const loading = ref(false)

  const fetchTickets = async () => {
    loading.value = true
    await delay(500)
    tickets.value = [...getStoredTickets()].reverse() // Return newest first
    loading.value = false
  }

  const getTicket = async (id) => {
    await delay(300)
    const ticket = tickets.value.find(t => t.id === parseInt(id))
    if (!ticket) {
      throw new Error('Ticket not found')
    }
    return ticket
  }

  const createTicket = async (ticketData) => {
    await delay(500)
    const user = JSON.parse(localStorage.getItem('ticketapp_user'))
    const newTicket = {
      id: Date.now(),
      ...ticketData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.email
    }
    
    const allTickets = getStoredTickets()
    allTickets.push(newTicket)
    saveTickets(allTickets)
    tickets.value.unshift(newTicket)
    
    return newTicket
  }

  const updateTicket = async (id, ticketData) => {
    await delay(500)
    const allTickets = getStoredTickets()
    const index = allTickets.findIndex(t => t.id === parseInt(id))
    if (index === -1) {
      throw new Error('Ticket not found')
    }
    
    allTickets[index] = {
      ...allTickets[index],
      ...ticketData,
      updatedAt: new Date().toISOString()
    }
    
    saveTickets(allTickets)
    
    // Update in local state
    const localIndex = tickets.value.findIndex(t => t.id === parseInt(id))
    if (localIndex !== -1) {
      tickets.value[localIndex] = allTickets[index]
    }
    
    return allTickets[index]
  }

  const deleteTicket = async (id) => {
    await delay(300)
    const allTickets = getStoredTickets()
    const index = allTickets.findIndex(t => t.id === parseInt(id))
    if (index === -1) {
      throw new Error('Ticket not found')
    }
    
    const deletedTicket = allTickets[index]
    allTickets.splice(index, 1)
    saveTickets(allTickets)
    
    // Remove from local state
    const localIndex = tickets.value.findIndex(t => t.id === parseInt(id))
    if (localIndex !== -1) {
      tickets.value.splice(localIndex, 1)
    }
    
    return deletedTicket
  }

  const getStats = () => {
    const total = tickets.value.length
    const open = tickets.value.filter(ticket => ticket.status === 'open').length
    const inProgress = tickets.value.filter(ticket => ticket.status === 'in_progress').length
    const closed = tickets.value.filter(ticket => ticket.status === 'closed').length

    return { total, open, inProgress, closed }
  }

  return {
    tickets,
    loading,
    fetchTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    getStats
  }
})