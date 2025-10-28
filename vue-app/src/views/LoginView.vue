<template>
  <AppLayout>
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <router-link to="/" class="auth-logo">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">T</span>
              </div>
              <span class="text-xl font-bold text-gray-900">TicketFlow</span>
            </router-link>
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form @submit.prevent="handleSubmit" class="auth-form">
            <div v-if="errors.submit" class="error-banner">
              {{ errors.submit }}
            </div>

            <div class="form-group">
              <label for="email" class="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                :class="['form-input', { 'error': errors.email }]"
                placeholder="Enter your email"
                @input="clearError('email')"
              />
              <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
            </div>

            <div class="form-group">
              <div class="flex justify-between items-center">
                <label for="password" class="form-label">
                  Password
                </label>
                <router-link to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </router-link>
              </div>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                :class="['form-input', { 'error': errors.password }]"
                placeholder="Enter your password"
                @input="clearError('password')"
              />
              <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary w-full"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </form>

          <div class="auth-footer">
            <p>
              Don't have an account?{' '}
              <router-link to="/auth/signup" class="text-blue-600 hover:text-blue-500 font-medium">
                Sign up
              </router-link>
            </p>
          </div>

          <div class="demo-credentials">
            <div class="demo-card">
              <h4>Demo Credentials</h4>
              <p>Email: test@example.com</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppLayout from '../components/Layout/AppLayout.vue'

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({})
const loading = ref(false)

const clearError = (field) => {
  if (errors[field]) {
    errors[field] = ''
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!formData.email) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid'
  }

  if (!formData.password) {
    newErrors.password = 'Password is required'
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  const result = await authStore.login(formData.email, formData.password)
  loading.value = false

  if (result.success) {
    router.push('/dashboard')
  } else {
    errors.submit = result.error
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--gray-200);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  text-decoration: none;
}

.auth-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--gray-600);
}

.auth-form {
  margin-bottom: 1.5rem;
}

.error-banner {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  font-size: var(--text-sm);
}

.demo-credentials {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
}

.demo-card {
  background-color: var(--gray-50);
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
}

.demo-card h4 {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.demo-card p {
  font-size: var(--text-sm);
  color: var(--gray-600);
  margin-bottom: 0.25rem;
}

.auth-footer {
  text-align: center;
  color: var(--gray-600);
}

.auth-footer a {
  text-decoration: none;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }
}
</style>