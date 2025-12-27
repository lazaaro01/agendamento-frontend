import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),

  actions: {
    async login(credentials) {
      this.loading = true

      try {
        const response = await api.post('/auth/login', credentials)

        this.token = response.data.token
        this.user = response.data.user

        localStorage.setItem('token', this.token)

        return response.data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(data) {
      const response = await api.post('/auth/register', data)
      return response.data
    },

    async fetchProfile() {
      if (!this.token) return
      try {
        const response = await api.get('/auth/profile')
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})