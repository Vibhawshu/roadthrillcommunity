import React, { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, MapPin, Briefcase, Calendar, Heart, Send, Bike, CheckCircle, Shield } from 'lucide-react'
import joinBg from '../../assets/images/join/join-bg.jpg'

// Form validation schema - UPDATED with driving license checkbox
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
      
      // Create FormData
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
      
      // Send to Google Script
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
    <section id="join" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={joinBg}
          alt="Join community background"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="max-w-2xl">
          {/* Section Header - BIGGER FONTS */}
          <div className="mb-8">
            <span className="text-red-500 font-semibold text-lg uppercase tracking-wider">BECOME A MEMBER</span>
            <h2 className="text-white mt-2 mb-4 font-bold text-6xl lg:text-7xl">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Thrill</span>
            </h2>
            <p className="text-xl text-gray-300">
              Become part of our family of adventure seekers. Fill out the form below and 
              we'll get back to you with details about upcoming rides and events.
            </p>
          </div>

          {/* Form Container */}
          <div>
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 text-green-500 backdrop-blur-sm">
                <CheckCircle size={24} />
                <span className="text-lg">Thank you for joining! We'll be in touch soon.</span>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-500 backdrop-blur-sm">
                <span className="text-lg">{submitError}</span>
              </div>
            )}

            {/* Form */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-2">
                      <User className="inline w-4 h-4 mr-2 text-red-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-2">
                      <Calendar className="inline w-4 h-4 mr-2 text-red-500" />
                      DOB (DD/MM/YYYY) *
                    </label>
                    <input
                      type="text"
                      {...register('dob')}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="15/03/1990"
                    />
                    {errors.dob && (
                      <p className="mt-1 text-sm text-red-500">{errors.dob.message}</p>
                    )}
                  </div>

                  {/* Location Field */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2 text-red-500" />
                      Current Location *
                    </label>
                    <input
                      type="text"
                      {...register('location')}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="City, State"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>

                  {/* Profession Field */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-2">
                      <Briefcase className="inline w-4 h-4 mr-2 text-red-500" />
                      Profession *
                    </label>
                    <input
                      type="text"
                      {...register('profession')}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="Software Engineer"
                    />
                    {errors.profession && (
                      <p className="mt-1 text-sm text-red-500">{errors.profession.message}</p>
                    )}
                  </div>

                  {/* Country Field */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2 text-red-500" />
                      Country *
                    </label>
                    <input
                      type="text"
                      {...register('country')}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="India"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
                    )}
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-2">
                      <User className="inline w-4 h-4 mr-2 text-red-500" />
                      Gender *
                    </label>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                          { value: 'prefer-not-to-say', label: 'Prefer not' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              value={option.value}
                              {...register('gender')}
                              className="w-4 h-4 accent-red-600"
                            />
                            <span className="text-base text-gray-300 group-hover:text-white transition-colors">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                    )}
                  </div>
                </div>

                {/* Reason Field - Full width */}
                <div>
                  <label className="block text-base font-medium text-gray-300 mb-2">
                    <Heart className="inline w-4 h-4 mr-2 text-red-500" />
                    Why do you want to join? *
                  </label>
                  <textarea
                    {...register('reason')}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-base focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                    placeholder="Tell us about your passion for biking..."
                  />
                  {errors.reason && (
                    <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
                  )}
                </div>

                {/* NEW: Driving License Checkbox */}
                <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('drivingLicense')}
                      className="w-5 h-5 mt-0.5 accent-red-600"
                    />
                    <div className="flex-1">
                      <span className="text-base text-gray-300 group-hover:text-white transition-colors flex items-center gap-2">
                        <Shield size={18} className="text-red-500" />
                        I have a valid 2 wheeler driving permit issued by Govt. of India *
                      </span>
                      {errors.drivingLicense && (
                        <p className="mt-2 text-sm text-red-500">{errors.drivingLicense.message}</p>
                      )}
                    </div>
                  </label>
                </div>

                {/* Submit Button - BIGGER */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 group"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Bike size={24} className="group-hover:rotate-12 transition-transform" />
                        Join the Community
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Badge - UPDATED: Removed Privacy Policy, only Terms */}
            <div className="mt-4 text-left">
              <p className="text-sm text-gray-400">
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