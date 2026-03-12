import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/icons/Logo.png'
import StartNowModal from '../common/StartNowModal'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Top navigation items (HOME, EXPERIENCES)
  const topNavItems = [
    { name: 'HOME', href: '#home' },
    { name: 'EXPERIENCES', href: '#experiences' }
  ]

  // Bottom navigation items (CALENDAR, ABOUT US, JOIN NOW, CONTACT)
  const bottomNavItems = [
    { name: 'CALENDAR', href: '#events' },
    { name: 'ABOUT US', href: '#team' },
    { name: 'JOIN NOW', href: '#join' },
    { name: 'CONTACT', href: '#contact' }
  ]

  // All navigation items for hamburger dropdown
  const allNavItems = [
    { name: 'HOME', href: '#home' },
    { name: 'EXPERIENCES', href: '#experiences' },
    { name: 'CALENDAR', href: '#events' },
    { name: 'ABOUT US', href: '#team' },
    { name: 'JOIN NOW', href: '#join' },
    { name: 'CONTACT', href: '#contact' }
  ]

  const handleStartNow = () => {
    setIsModalOpen(true)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Top Navbar - Desktop ONLY */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/40 backdrop-blur-md border-b border-white/10' 
          : 'bg-gray-900/30 backdrop-blur-sm border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Left: Logo and tagline */}
            <div className="flex items-center gap-3 lg:gap-4">
              <a href="/" className="flex items-center">
                <img src={logo} alt="RoadThrill" className="h-7 lg:h-8 w-auto" />
              </a>
              <div className="hidden lg:block text-[7px] lg:text-[8px] tracking-[0.3em] text-gray-300/80 uppercase whitespace-nowrap font-medium">
                MEET • TRAVEL • DISCOVER
              </div>
            </div>

            {/* Center: Top Navigation */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              {topNavItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-gray-200/90 hover:text-white text-xs lg:text-sm uppercase tracking-wide font-medium transition-colors relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right: CTA Button and Hamburger Menu */}
            <div className="flex items-center gap-2 lg:gap-3 relative">
              <button 
                onClick={handleStartNow}
                className="hidden md:block px-3 lg:px-4 py-1.5 lg:py-2 border border-red-600/90 rounded-full text-gray-100 text-xs lg:text-sm uppercase tracking-wide font-medium hover:bg-red-600 hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                START NOW
              </button>
              
              {/* Hamburger Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hidden md:block text-gray-200/90 hover:text-white transition-colors p-1 focus:outline-none"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} className="lg:w-5 lg:h-5" /> : <Menu size={20} className="lg:w-5 lg:h-5" />}
              </button>

              {/* Desktop Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                  <div className="flex flex-col">
                    {allNavItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-200/90 hover:text-white hover:bg-red-600/20 px-4 py-3 text-sm uppercase tracking-wide transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                    <div className="border-t border-white/10 my-2"></div>
                    <button
                      onClick={handleStartNow}
                      className="mx-3 mt-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white text-sm uppercase tracking-wide font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300"
                    >
                      START NOW
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Strip - Desktop ONLY */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-gray-900/40 backdrop-blur-sm border-t border-white/10 py-2 lg:py-2.5 z-50">
        <div className="flex justify-center items-center gap-5 lg:gap-6 max-w-7xl mx-auto">
          {bottomNavItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-gray-300/80 hover:text-red-600 text-[10px] lg:text-xs uppercase tracking-widest transition-colors whitespace-nowrap font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* MOBILE VIEW - Simplified Navigation */}
      
      {/* Mobile Top Bar with Logo and Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center">
            <img src={logo} alt="RoadThrill" className="h-8 w-auto" />
          </a>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-white/10 py-2 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col">
              {allNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-200 hover:text-white px-6 py-4 text-base uppercase tracking-wide border-b border-white/5 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-6 py-4">
                <button
                  onClick={handleStartNow}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-full text-sm uppercase tracking-wide font-medium"
                >
                  START NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Top Spacer - This pushes content below the fixed header */}
      <div className="md:hidden h-14" /> {/* Exactly matches mobile header height (56px) */}

      {/* No bottom spacer needed since we don't have bottom nav on mobile */}

      <StartNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Header