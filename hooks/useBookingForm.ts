import { useState } from 'react'
import axios from 'axios'

interface BookingData {
  name: string
  email: string
  phone: string
  departure: string
  destination: string
  date: string
  passengers: number
  message: string
}

interface BookingResult {
  success: boolean
  message?: string
}

export function useBookingForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitBooking = async (data: BookingData): Promise<BookingResult> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Mock API call - replace with your actual API endpoint
      const response = await axios.post('/api/booking', data)
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock success response
      setSuccess(true)
      setLoading(false)
      
      return {
        success: true,
        message: 'Booking submitted successfully',
      }
    } catch (err) {
      const errorMessage = 
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Failed to submit booking. Please try again.'
      
      setError(errorMessage)
      setLoading(false)
      
      return {
        success: false,
        message: errorMessage,
      }
    }
  }

  return {
    submitBooking,
    loading,
    error,
    success,
  }
}