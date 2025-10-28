<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">T</span>
          </div>
          <span class="text-xl font-bold text-gray-900">TicketFlow</span>
        </router-link>

        <!-- Navigation -->
        <nav class="flex items-center space-x-6">
          <template v-if="authStore.user">
            <router-link 
              to="/dashboard" 
              class="text-sm font-medium transition-colors"
              :class="{
                'text-blue-600': $route.path === '/dashboard',
                'text-gray-600 hover:text-gray-900': $route.path !== '/dashboard'
              }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/tickets" 
              class="text-sm font-medium transition-colors"
              :class="{
                'text-blue-600': $route.path === '/tickets',
                'text-gray-600 hover:text-gray-900': $route.path !== '/tickets'
              }"
            >
              Tickets
            </router-link>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-700">
                Welcome, {{ authStore.user.name }}
              </span>
              <button
                @click="handleLogout"
                class="btn btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center space-x-4">
              <router-link 
                to="/auth/login" 
                class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </router-link>
              <router-link 
                to="/auth/signup" 
                class="btn btn-primary text-sm"
              >
                Get Started
              </router-link>
            </div>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>