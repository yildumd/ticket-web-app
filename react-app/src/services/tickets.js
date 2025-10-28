// Mock data for tickets
let tickets = JSON.parse(localStorage.getItem('ticketapp_tickets')) || [
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

const saveTickets = () => {
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
}

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getTickets = async () => {
  await delay(500)
  return [...tickets].reverse() // Return newest first
}

export const getTicket = async (id) => {
  await delay(300)
  const ticket = tickets.find(t => t.id === parseInt(id))
  if (!ticket) {
    throw new Error('Ticket not found')
  }
  return ticket
}

export const createTicket = async (ticketData) => {
  await delay(500)
  const newTicket = {
    id: Date.now(),
    ...ticketData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: JSON.parse(localStorage.getItem('ticketapp_user')).email
  }
  tickets.push(newTicket)
  saveTickets()
  return newTicket
}

export const updateTicket = async (id, ticketData) => {
  await delay(500)
  const index = tickets.findIndex(t => t.id === parseInt(id))
  if (index === -1) {
    throw new Error('Ticket not found')
  }
  tickets[index] = {
    ...tickets[index],
    ...ticketData,
    updatedAt: new Date().toISOString()
  }
  saveTickets()
  return tickets[index]
}

export const deleteTicket = async (id) => {
  await delay(300)
  const index = tickets.findIndex(t => t.id === parseInt(id))
  if (index === -1) {
    throw new Error('Ticket not found')
  }
  const deletedTicket = tickets[index]
  tickets.splice(index, 1)
  saveTickets()
  return deletedTicket
}