<template>
  <AppLayout>
    <div class="tickets-page">
      <div class="container">
        <!-- Header -->
        <div class="tickets-header">
          <div class="header-content">
            <h1>Ticket Management</h1>
            <p>Create, view, and manage your support tickets</p>
          </div>
          <div class="header-actions">
            <div class="view-toggle">
              <button
                @click="view = 'list'"
                :class="['toggle-btn', { 'active': view === 'list' }]"
              >
                List View
              </button>
              <button
                @click="view = 'grid'"
                :class="['toggle-btn', { 'active': view === 'grid' }]"
              >
                Grid View
              </button>
            </div>
            <button
              @click="showCreateForm"
              class="btn btn-primary"
            >
              Create Ticket
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="tickets-content">
          <TicketForm
            v-if="showForm"
            :ticket="editingTicket"
            @close="hideForm"
            @saved="handleFormSaved"
          />
          <TicketList
            v-else
            :tickets="ticketsStore.tickets"
            :view="view"
            @edit="handleEditTicket"
            @update="ticketsStore.fetchTickets"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '../stores/tickets'
import AppLayout from '../components/Layout/AppLayout.vue'
import TicketList from '../components/Tickets/TicketList.vue'
import TicketForm from '../components/Tickets/TicketForm.vue'

const ticketsStore = useTicketsStore()
const route = useRoute()
const router = useRouter()

const view = ref('list')
const showForm = ref(false)
const editingTicket = ref(null)

onMounted(() => {
  ticketsStore.fetchTickets()
})

// Handle URL parameters for creating tickets
watch(() => route.query, (newQuery) => {
  if (newQuery.create === 'new') {
    showCreateForm()
  }
})

const showCreateForm = () => {
  showForm.value = true
  editingTicket.value = null
  router.replace({ query: { view: 'form' } })
}

const handleEditTicket = (ticket) => {
  editingTicket.value = ticket
  showForm.value = true
  router.replace({ query: { view: 'form' } })
}

const hideForm = () => {
  showForm.value = false
  editingTicket.value = null
  router.replace({ query: {} })
}

const handleFormSaved = () => {
  hideForm()
  ticketsStore.fetchTickets()
}
</script>

<style scoped>
.tickets-page {
  padding: 2rem 0;
}

.tickets-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
}

.header-content h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.header-content p {
  color: var(--gray-600);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.view-toggle {
  display: flex;
  background: var(--gray-100);
  border-radius: var(--radius-lg);
  padding: 0.25rem;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: var(--white);
  box-shadow: var(--shadow-sm);
  color: var(--primary-color);
}

.tickets-content {
  min-height: 400px;
}

@media (max-width: 768px) {
  .tickets-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .header-actions {
    justify-content: space-between;
  }
}
</style>