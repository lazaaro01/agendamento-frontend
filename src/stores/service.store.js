import { defineStore } from 'pinia'
import api from '../services/api'

export const useServiceStore = defineStore('service', {
    state: () => ({
        services: [],
        loading: false,
    }),

    actions: {
        async fetchServices() {
            this.loading = true
            try {
                const response = await api.get('/services')
                this.services = response.data
            } catch (error) {
                console.error('Error fetching services:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async createService(serviceData) {
            this.loading = true
            try {
                const response = await api.post('/services', serviceData)
                this.services.push(response.data)
                return response.data
            } catch (error) {
                console.error('Error creating service:', error)
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
