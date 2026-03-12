import React, { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, MapPin, Briefcase, Calendar, Heart, Send, Bike, CheckCircle, Shield } from 'lucide-react'
import joinBg from '../../assets/images/join/join-bg.jpg'

// Form validation schema
const joinFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in DD/MM/YYYY format'),
  location: z.string().min(2, 'Location is required'),
  profession: z.string().min(2, 'Profession is required'),
  country: z.string().min(2, 'Country is required'),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
  reason: z.string().min(20, 'Please tell us why you want to join (minimum 20 characters)'),
  drivingLicense: z.boolean().refine(val => val === true, {
    message: 'You must have a valid 2 wheeler driving permit',
  }),
})

type JoinFormData = z.infer<typeof joinFormSchema>

// Your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAIAycmuV-TtCrgXuGFGOYycA7z_WC7TTJr5QBZHnKqAHl9bjvwKN3AZ3U0X2eRSIjyQ/exec'

const Join: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      gender: 'prefer-not-to-say',
      drivingLicense: false,
    }
  })

  const onSubmit: SubmitHandler<JoinFormData> = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      console.log('Form submission:', data)
      
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('dob', data.dob)
      formData.append('location', data.location)
      formData.append('profession', data.profession)
      formData.append('country', data.country)
      formData.append('gender', data.gender)
      formData.append('reason', data.reason)
      formData.append('drivingLicense', data.drivingLicense ? 'Yes' : 'No')
      formData.append('source', 'join_section')
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      })
      
      setSubmitSuccess(true)
      reset()
      
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
      
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="join" className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={joinBg}
          alt="Join community background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="max-w-2xl mx-auto lg:mx-0">
          {/* Section Header - Mobile optimized */}
          <div className="mb-6 sm:mb-8">
            <span className="text-red-500 font-semibold text-sm sm:text-base lg:text-lg uppercase tracking-wider">BECOME A MEMBER</span>
            <h2 className="text-white mt-2 mb-3 sm:mb-4 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Thrill</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300">
              Become part of our family of adventure seekers. Fill out the form below and 
              we'll get back to you with details about upcoming rides and events.
            </p>
          </div>

          {/* Form Container */}
          <div>
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 sm:gap-3 text-green-500 backdrop-blur-sm">
                <CheckCircle size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="text-sm sm:text-base">Thank you for joining! We'll be in touch soon.</span>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 sm:gap-3 text-red-500 backdrop-blur-sm">
                <span className="text-sm sm:text-base">{submitError}</span>
              </div>
            )}

            {/* Form */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                      <User className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm sm:text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                      <Calendar className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                      DOB (DD/MM/YYYY) *
                    </label>
                    <input
                      type="text"
                      {...register('dob')}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm sm:text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="15/03/1990"
                    />
                    {errors.dob && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.dob.message}</p>
                    )}
                  </div>

                  {/* Location Field */}
                  <div>
                    <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                      <MapPin className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                      Current Location *
                    </label>
                    <input
                      type="text"
                      {...register('location')}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm sm:text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="City, State"
                    />
                    {errors.location && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>

                  {/* Profession Field */}
                  <div>
                    <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                      <Briefcase className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                      Profession *
                    </label>
                    <input
                      type="text"
                      {...register('profession')}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm sm:text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="Software Engineer"
                    />
                    {errors.profession && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.profession.message}</p>
                    )}
                  </div>

                  {/* Country Field */}
                  <div>
                    <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                      <MapPin className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                      Country *
                    </label>
                    <input
                      type="text"
                      {...register('country')}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm sm:text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="India"
                    />
                    {errors.country && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.country.message}</p>
                    )}
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                      <User className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                      Gender *
                    </label>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-2 sm:p-3">
                      <div className="grid grid-cols-2 gap-1 sm:gap-2">
                        {[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                          { value: 'prefer-not-to-say', label: 'Prefer not' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-1 sm:gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              value={option.value}
                              {...register('gender')}
                              className="w-3 h-3 sm:w-4 sm:h-4 accent-red-600"
                            />
                            <span className="text-xs sm:text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.gender.message}</p>
                    )}
                  </div>
                </div>

                {/* Reason Field */}
                <div>
                  <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                    <Heart className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                    Why do you want to join? *
                  </label>
                  <textarea
                    {...register('reason')}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm sm:text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                    placeholder="Tell us about your passion for biking..."
                  />
                  {errors.reason && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.reason.message}</p>
                  )}
                </div>

                {/* Driving License Checkbox */}
                <div className="bg-black/40 border border-white/10 rounded-lg p-3 sm:p-4">
                  <label className="flex items-start gap-2 sm:gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('drivingLicense')}
                      className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 accent-red-600 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start gap-1.5 sm:gap-2">
                        <Shield size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                          I have a valid 2 wheeler driving permit issued by Govt. of India.*
                        </span>
                      </div>
                      {errors.drivingLicense && (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-500">{errors.drivingLicense.message}</p>
                      )}
                    </div>
                  </label>
                </div>

                {/* Submit Button - FIXED spacing for mobile */}
                <div className="pt-2 sm:pt-3 lg:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base lg:text-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 group"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Bike size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform" />
                        <span>Join the Community</span>
                        <Send size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Badge */}
            <div className="mt-3 sm:mt-4 text-left">
              <p className="text-xs sm:text-sm text-gray-400">
                By joining, you agree to our{' '}
                <a href="#" className="text-red-500 hover:text-red-400 transition-colors font-medium">Terms</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Join