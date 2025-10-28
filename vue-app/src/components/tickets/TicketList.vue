<template>
  <div class="ticket-list">
    <!-- Filters and Search -->
    <div class="filters-section">
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="search-icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search tickets..."
          v-model="searchTerm"
          class="search-input"
        />
      </div>

      <div class="filter-buttons">
        <button
          @click="filter = 'all'"
          :class="['filter-btn', { 'active': filter === 'all' }]"
        >
          All ({{ tickets.length }})
        </button>
        <button
          @click="filter = 'open'"
          :class="['filter-btn', { 'active': filter === 'open' }]"
        >
          Open ({{ getStatusCount('open') }})
        </button>
        <button
          @click="filter = 'in_progress'"
          :class="['filter-btn', { 'active': filter === 'in_progress' }]"
        >
          In Progress ({{ getStatusCount('in_progress') }})
        </button>
        <button
          @click="filter = 'closed'"
          :class="['filter-btn', { 'active': filter === 'closed' }]"
        >
          Closed ({{ getStatusCount('closed') }})
        </button>
      </div>
    </div>

    <!-- Tickets Grid/List -->
    <div v-if="filteredTickets.length > 0" :class="['tickets-container', view === 'grid' ? 'grid-view' : 'list-view']">
      <TicketCard
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        :ticket="ticket"
        :view="view"
        @edit="$emit('edit', ticket)"
        @update="$emit('update')"
      />
    </div>

    <!-- Empty State -->
    <div v-else-if="tickets.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3>No tickets yet</h3>
      <p>Create your first ticket to get started</p>
    </div>

    <!-- No Results -->
    <div v-else class="no-results">
      <p>No tickets found matching your criteria.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TicketCard from './TicketCard.vue'

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  },
  view: {
    type: String,
    default: 'list'
  }
})

const emit = defineEmits(['edit', 'update'])

const filter = ref('all')
const searchTerm = ref('')

const getStatusCount = (status) => {
  return props.tickets.filter(ticket => ticket.status === status).length
}

const filteredTickets = computed(() => {
  return props.tickets.filter(ticket => {
    const matchesFilter = filter.value === 'all' || ticket.status === filter.value
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})
</script>

<style scoped>
.ticket-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--gray-500);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: var(--gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
}

.empty-icon svg {
  width: 40px;
  height: 40px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-700);
}

.empty-state p {
  color: var(--gray-500);
}

.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--gray-400);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  background: var(--white);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.filter-btn:hover:not(.active) {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

.tickets-container {
  display: grid;
  gap: 1.5rem;
}

.tickets-container.list-view {
  grid-template-columns: 1fr;
}

.tickets-container.grid-view {
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: var(--gray-500);
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: auto;
  }

  .filter-buttons {
    justify-content: center;
  }

  .tickets-container.grid-view {
    grid-template-columns: 1fr;
  }
}
</style>