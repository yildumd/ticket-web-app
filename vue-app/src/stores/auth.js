import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  // Check if user is logged in on app load
  const init = () => {
    const token = localStorage.getItem('ticketapp_session')
    if (token) {
      const userData = JSON.parse(localStorage.getItem('ticketapp_user') || 'null')
      user.value = userData
    }
    loading.value = false
  }

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication
      if (email === 'test@example.com' && password === 'password123') {
        const userData = {
          id: 1,
          email: email,
          name: 'Test User'
        }
        
        const token = 'mock-jwt-token-' + Date.now()
        
        localStorage.setItem('ticketapp_session', token)
        localStorage.setItem('ticketapp_user', JSON.stringify(userData))
        user.value = userData
        
        return { success: true }
      } else {
        return { 
          success: false, 
          error: 'Invalid email or password' 
        }
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock signup
      const userData = {
        id: Date.now(),
        email: email,
        name: name
      }
      
      const token = 'mock-jwt-token-' + Date.now()
      
      localStorage.setItem('ticketapp_session', token)
      localStorage.setItem('ticketapp_user', JSON.stringify(userData))
      user.value = userData
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: 'Signup failed. Please try again.' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    localStorage.removeItem('ticketapp_user')
    user.value = null
  }

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    loading,
    init,
    login,
    signup,
    logout,
    isAuthenticated
  }
})