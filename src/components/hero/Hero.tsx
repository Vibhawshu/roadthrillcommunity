import React, { useState, useEffect } from 'react'
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

// Import your 3 background images
import meetBg from '../../assets/images/events/Ride-1.jpeg'
import travelBg from '../../assets/images/events/Ride-2.jpeg'
import discoverBg from '../../assets/images/events/Ride-3.jpeg'

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    { word: 'MEET', bg: meetBg },
    { word: 'TRAVEL', bg: travelBg },
    { word: 'DISCOVER', bg: discoverBg }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Calculate transform value based on slide index
  const getTransformValue = () => {
    return `translateY(-${currentSlide * 33.333}%)`
  }

  const handleStartNow = () => {
    window.location.href = '#join'
  }

  const handleLearnMore = () => {
    window.location.href = '#team'
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Images Carousel */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.bg}
            alt={`${slide.word} background`} 
            className="w-full h-full object-cover"
          />
          {/* Left to right gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
      ))}

      {/* Hero Content - Adjusted top padding for mobile */}
      <div className="relative h-full flex items-center">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-0 md:mt-0">
          {/* Main Title with Carousel */}
          <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6">
            <div className="relative h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 overflow-hidden">
              <div 
                className="absolute w-full transition-transform duration-700 ease-in-out"
                style={{ transform: getTransformValue() }}
              >
                {slides.map((slide, index) => (
                  <div 
                    key={index} 
                    className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 flex items-center"
                  >
                    <h1 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-wider leading-tight"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {slide.word}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subtext - Mobile optimized */}
          <div className="space-y-0.5 sm:space-y-1 mb-3 sm:mb-4 md:mb-6">
            <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-gray-300 tracking-widest">A PLACE TO MEET</p>
            <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-gray-300 tracking-widest">A REASON TO TRAVEL</p>
            <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-gray-300 tracking-widest">A JOURNEY TO DISCOVER</p>
          </div>

          {/* CTA Buttons - Mobile optimized */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
            <button 
              onClick={handleStartNow}
              className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-red-600 text-white uppercase font-bold text-[8px] sm:text-[10px] md:text-xs tracking-wide hover:bg-red-700 transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full sm:rounded-lg w-fit sm:w-auto"
            >
              START NOW
            </button>
            <button 
              onClick={handleLearnMore}
              className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 border border-white text-white uppercase font-bold text-[8px] sm:text-[10px] md:text-xs tracking-wide hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full sm:rounded-lg w-fit sm:w-auto"
            >
              LEARN MORE
            </button>
          </div>

          {/* Social Icons - Mobile optimized */}
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            {[
              { Icon: Instagram, href: 'https://www.instagram.com/roadthrill?igsh=MWVuN3czM2RiZmZ3ZQ==' },
              { Icon: Twitter, href: 'https://x.com/road_thrill?s=11&t=rJ9lEZrn5KAFZ1QS_RUQVA' },
              { Icon: Facebook, href: 'https://www.facebook.com/share/g/1L6YCrkhBM/?mibextid=wwXIfr' }
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-500 transition-all hover:scale-110"
              >
                <Icon size={14} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Indicators - Fixed for mobile */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex gap-1 sm:gap-1.5 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all ${
              index === currentSlide 
                ? 'w-2.5 sm:w-3 md:w-4 h-0.5 sm:h-1 bg-red-600' 
                : 'w-1 sm:w-1.5 h-0.5 sm:h-1 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero