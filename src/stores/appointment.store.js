import { defineStore } from 'pinia'
import api from '../services/api'

export const useAppointmentStore = defineStore('appointment', {
    state: () => ({
        appointments: [],
        loading: false,
    }),

    actions: {
        async fetchAppointments() {
            this.loading = true
            try {
                const response = await api.get('/appointments')
                this.appointments = response.data
            } catch (error) {
                console.error('Error fetching appointments:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async createAppointment(appointmentData) {
            this.loading = true
            try {
                const response = await api.post('/appointments', appointmentData)
                this.appointments.push(response.data)
                return response.data
            } catch (error) {
                console.error('Error creating appointment:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async cancelAppointment(appointmentId) {
            this.loading = true
            try {
                await api.delete(`/appointments/${appointmentId}`)
                this.appointments = this.appointments.filter(a => a.id !== appointmentId)
            } catch (error) {
                console.error('Error cancelling appointment:', error)
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
