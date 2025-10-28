<template>
  <AppLayout>
    <div class="dashboard">
      <div class="container">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h1>Welcome back, {{ authStore.user?.name }}!</h1>
          <p>Here's what's happening with your tickets today.</p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon total">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.total }}</div>
              <div class="stat-label">Total Tickets</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon open">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.open }}</div>
              <div class="stat-label">Open</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon in-progress">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.inProgress }}</div>
              <div class="stat-label">In Progress</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon closed">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.closed }}</div>
              <div class="stat-label">Resolved</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <router-link to="/tickets" class="action-card">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3>View All Tickets</h3>
              <p>See all your tickets in one place</p>
            </router-link>

            <router-link to="/tickets?create=new" class="action-card">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3>Create New Ticket</h3>
              <p>Submit a new support ticket</p>
            </router-link>

            <div class="action-card">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3>Reports</h3>
              <p>View ticket analytics and reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTicketsStore } from '../stores/tickets'
import AppLayout from '../components/Layout/AppLayout.vue'

const authStore = useAuthStore()
const ticketsStore = useTicketsStore()

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0
})

const loading = ref(true)

onMounted(async () => {
  await ticketsStore.fetchTickets()
  stats.value = ticketsStore.getStats()
  loading.value = false
})
</script>

<style scoped>
.dashboard {
  padding: 2rem 0;
}

.welcome-section {
  margin-bottom: 3rem;
}

.welcome-section h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.welcome-section p {
  font-size: 1.125rem;
  color: var(--gray-600);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 30px;
  height: 30px;
}

.stat-icon.total {
  background-color: rgb(59 130 246 / 0.1);
  color: var(--primary-color);
}

.stat-icon.open {
  background-color: rgb(16 185 129 / 0.1);
  color: var(--status-open);
}

.stat-icon.in-progress {
  background-color: rgb(245 158 11 / 0.1);
  color: var(--status-in-progress);
}

.stat-icon.closed {
  background-color: rgb(107 114 128 / 0.1);
  color: var(--status-closed);
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--gray-600);
  font-weight: 500;
}

.quick-actions h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  display: block;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.action-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
}

.action-icon svg {
  width: 24px;
  height: 24px;
}

.action-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.action-card p {
  color: var(--gray-600);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem 0;
  }

  .welcome-section h1 {
    font-size: 1.875rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 1.25rem;
  }
}
</style>