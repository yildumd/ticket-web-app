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
            <h1>Create your account</h1>
            <p>Get started with your free account today</p>
          </div>

          <form @submit.prevent="handleSubmit" class="auth-form">
            <div v-if="errors.submit" class="error-banner">
              {{ errors.submit }}
            </div>

            <div class="form-group">
              <label for="name" class="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                :class="['form-input', { 'error': errors.name }]"
                placeholder="Enter your full name"
                @input="clearError('name')"
              />
              <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
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
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                :class="['form-input', { 'error': errors.password }]"
                placeholder="Create a password"
                @input="clearError('password')"
              />
              <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
            </div>

            <div class="form-group">
              <label for="confirmPassword" class="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                :class="['form-input', { 'error': errors.confirmPassword }]"
                placeholder="Confirm your password"
                @input="clearError('confirmPassword')"
              />
              <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary w-full"
            >
              {{ loading ? 'Creating account...' : 'Create account' }}
            </button>
          </form>

          <div class="auth-footer">
            <p>
              Already have an account?{' '}
              <router-link to="/auth/login" class="text-blue-600 hover:text-blue-500 font-medium">
                Sign in
              </router-link>
            </p>
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
import AppLayout from '../components/layout/AppLayout.vue'

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
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

  if (!formData.name) {
    newErrors.name = 'Name is required'
  }

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

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = 'Please confirm your password'
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  const result = await authStore.signup(formData.name, formData.email, formData.password)
  loading.value = false

  if (result.success) {
    router.push('/dashboard')
  } else {
    errors.submit = result.error
  }
}
</script>

<style scoped>
/* Same styles as LoginView */
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