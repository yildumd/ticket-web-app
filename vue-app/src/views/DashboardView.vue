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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.open }}</div>
              <div class="stat-label">Open Tickets</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon pending">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.pending }}</div>
              <div class="stat-label">Pending</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon closed">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.closed }}</div>
              <div class="stat-label">Closed</div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="recent-activity">
          <h2>Recent Activity</h2>
          <div class="activity-list">
            <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
              <div class="activity-icon">
                <span :class="`status-badge ${activity.status}`">{{ activity.status }}</span>
              </div>
              <div class="activity-content">
                <p class="activity-text">{{ activity.description }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <button class="action-btn primary" @click="$router.push('/tickets/create')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Create New Ticket
            </button>
            <button class="action-btn secondary" @click="$router.push('/tickets')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              View All Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import AppLayout from '../components/layout/AppLayout.vue'

export default {
  name: 'DashboardView',
  components: {
    AppLayout
  },
  setup() {
    const authStore = useAuthStore()
    const stats = ref({
      total: 0,
      open: 0,
      pending: 0,
      closed: 0
    })

    const recentActivities = ref([
      {
        id: 1,
        status: 'open',
        description: 'New ticket created: Login issue',
        time: '2 hours ago'
      },
      {
        id: 2,
        status: 'pending',
        description: 'Ticket updated: Payment gateway',
        time: '5 hours ago'
      },
      {
        id: 3,
        status: 'closed',
        description: 'Ticket resolved: Email configuration',
        time: '1 day ago'
      }
    ])

    onMounted(() => {
      // Simulate loading stats
      stats.value = {
        total: 12,
        open: 3,
        pending: 2,
        closed: 7
      }
    })

    return {
      authStore,
      stats,
      recentActivities
    }
  }
}
</script>

