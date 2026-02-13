'use client'

import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import gsap from 'gsap'
import { useBookingForm } from '@/hooks/useBookingForm'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface BookingFormData {
  name: string
  email: string
  phone: string
  departure: string
  destination: string
  date: string
  passengers: number
  message: string
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>()

  const { submitBooking, loading, error, success } = useBookingForm()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      )
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const onSubmit = async (data: BookingFormData) => {
    const result = await submitBooking(data)
    if (result.success) {
      reset()
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Book Your Flight</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Full Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Email Address *
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Phone Number *
            </label>
            <input
              {...register('phone', { required: 'Phone number is required' })}
              type="tel"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+971 50 123 4567"
            />
            {errors.phone && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Departure & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Departure *
              </label>
              <input
                {...register('departure', { required: 'Departure is required' })}
                type="text"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Dubai"
              />
              {errors.departure && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.departure.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Destination *
              </label>
              <input
                {...register('destination', { required: 'Destination is required' })}
                type="text"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="London"
              />
              {errors.destination && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.destination.message}</p>
              )}
            </div>
          </div>

          {/* Date & Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Date *
              </label>
              <input
                {...register('date', { required: 'Date is required' })}
                type="date"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              {errors.date && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Passengers *
              </label>
              <input
                {...register('passengers', {
                  required: 'Number of passengers is required',
                  min: { value: 1, message: 'At least 1 passenger required' },
                  max: { value: 12, message: 'Maximum 12 passengers' },
                })}
                type="number"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="2"
                min="1"
                max="12"
              />
              {errors.passengers && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.passengers.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Additional Notes
            </label>
            <textarea
              {...register('message')}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Any special requirements or preferences?"
            />
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-green-800">
                Booking request submitted successfully! We'll contact you shortly.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm sm:text-base">Submitting...</span>
              </>
            ) : (
              <>
                <span className="text-sm sm:text-base">Submit Booking Request</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}