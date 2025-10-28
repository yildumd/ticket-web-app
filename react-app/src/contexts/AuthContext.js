import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('ticketapp_session')
    if (token) {
      // In a real app, you would validate the token with your backend
      const userData = JSON.parse(localStorage.getItem('ticketapp_user') || 'null')
      setUser(userData)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in real app, this would be an API call
      if (email === 'test@example.com' && password === 'password123') {
        const userData = {
          id: 1,
          email: email,
          name: 'Test User'
        }
        
        const token = 'mock-jwt-token-' + Date.now()
        
        localStorage.setItem('ticketapp_session', token)
        localStorage.setItem('ticketapp_user', JSON.stringify(userData))
        setUser(userData)
        
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
      
      // Mock signup - in real app, this would be an API call
      const userData = {
        id: Date.now(),
        email: email,
        name: name
      }
      
      const token = 'mock-jwt-token-' + Date.now()
      
      localStorage.setItem('ticketapp_session', token)
      localStorage.setItem('ticketapp_user', JSON.stringify(userData))
      setUser(userData)
      
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
    setUser(null)
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}