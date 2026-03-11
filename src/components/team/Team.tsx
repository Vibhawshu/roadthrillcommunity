import React from 'react'
import { MapPin, Award, Shield, Users, Star, Linkedin, Instagram } from 'lucide-react'

import lohith from '../../assets/images/team/Lohith.jpg'
import abhishekImg from '../../assets/images/team/Abhishek.jpg'
import rider from '../../assets/images/team/rider.jpeg'
import arpan from '../../assets/images/team/arpan.jpg'
import kamal from '../../assets/images/team/kamal.jpg'
import Prateek from '../../assets/images/team/Prateek.jpg'
import Praveen from '../../assets/images/team/Praveen.jpg'
import Manish from '../../assets/images/team/manish.jpg'
import Naveen from '../../assets/images/team/Naveen.jpg'
// Import team section background image
import teamBg from '../../assets/images/experiences/team-bg.jpg'

interface TeamMember {
  name: string
  role: string
  location?: string
  image?: string
  social?: {
    linkedin?: string
    instagram?: string
  }
}

const Team: React.FC = () => {
  // RT Admins - First (NEW DESIGN)
  const admins: TeamMember[] = [
    { name: "Sandeep", role: "RT Bengaluru Admin", location: "Bengaluru", image: rider },
    { name: "Abhishek", role: "RT Bengaluru Admin", location: "Bengaluru", image: abhishekImg },
    { name: "Naveen Nembhwani", role: "RT Vizag Admin", location: "Vizag", image: Naveen },
    { name: "Praveen Patkar", role: "RT Hyderabad Admin", location: "Hyderabad", image: Praveen },
    { name: "Manish Khandat", role: "RT Hyderabad Admin", location: "Hyderabad", image: Manish },
    { name: "Prateek Swarnkar", role: "RT Cruise Admin", location: "Cruise", image: Prateek },
    { name: "Manju PC", role: "RT Mysuru Admin", location: "Mysuru", image: rider },
    { name: "Darshan Kalmane", role: "RT Shivmoga Admin", location: "Shivmoga", image: rider },
    { name: "Karthick", role: "RT Coimbatore Admin", location: "Coimbatore", image: rider },
    { name: "Arun Hilson", role: "RT Chennai Admin", location: "Chennai", image: rider },
    { name: "Narayan", role: "RT Delhi Admin", location: "Delhi", image: rider },
    { name: "Thejalinga", role: "RT Gulbarga Admin", location: "Gulbarga", image: rider },
    { name: "Umesh Nariyani", role: "RT Pune Admin", location: "Pune", image: rider },
    { name: "Ashutosh Sharma", role: "RT Ghaziabad Admin", location: "Ghaziabad", image: rider },
  ]

  // RT Advisory - Second
  const advisory: TeamMember[] = [
    { 
      name: "Arun Hilson", 
      role: "RT Advisory", 
      image: rider,
    },
    { 
      name: "Lohith Bittira", 
      role: "RT Advisory", 
      image: lohith,
    },
    { 
      name: "Kamal Chodri", 
      role: "RT Advisory", 
      image: kamal,
    },
  ]

  // RT Founders - Third
  const founders: TeamMember[] = [
    { 
      name: "Jacinth Paul", 
      role: "Founder", 
      image: rider,
    },
    { 
      name: "Tudu", 
      role: "Founder", 
      image: rider,
    },
    { 
      name: "Arpan Laha", 
      role: "Founder", 
      image: arpan,
    },
  ]

  // Helper function to get initials from name (fallback)
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <section id="team" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={teamBg}
          alt="Team background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header - 3x BIGGER FONT */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <span className="text-red-500 font-semibold text-2xl uppercase tracking-wider mb-6 block">THE TEAM</span>
          <h2 className="text-white font-bold text-8xl lg:text-9xl xl:text-9xl mb-8">
            Team<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Road Thrill</span>
          </h2>
          <p className="text-gray-300 text-3xl lg:text-4xl max-w-4xl mx-auto leading-relaxed">
            The passionate individuals who make Road Thrill an incredible community of bikers.
          </p>
        </div>

        {/* RT Admins Section - First (NEW DESIGN with bigger pics and overlay) */}
        <div className="mb-24">
          <h3 className="text-5xl lg:text-6xl font-bold text-white text-center mb-16 flex items-center justify-center gap-4">
            <Users className="w-14 h-14 text-red-500" />
            RT Admin Team
            <Users className="w-14 h-14 text-red-500" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {admins.map((person, index) => (
              <div
                key={index}
                className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300"
              >
                {/* Image Container - BIGGER */}
                <div className="relative h-96 w-full overflow-hidden">
                  {person.image ? (
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <span className="text-7xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800 w-40 h-40 rounded-full flex items-center justify-center">
                        {getInitials(person.name)}
                      </span>
                    </div>
                  )}
                  
                  {/* Dark Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  
                  {/* Name and Location Overlay at Bottom - BIGGER TEXT */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                    <h4 className="text-3xl font-bold text-white mb-3">{person.name}</h4>
                    <p className="text-red-500 font-semibold text-xl flex items-center justify-center gap-2">
                      <MapPin size={20} className="text-red-500" />
                      {person.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RT Advisory Section - Second */}
        <div className="mb-24">
          <h3 className="text-5xl lg:text-6xl font-bold text-white text-center mb-16 flex items-center justify-center gap-4">
            <Shield className="w-14 h-14 text-red-500" />
            RT Advisory
            <Shield className="w-14 h-14 text-red-500" />
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {advisory.map((person, index) => (
              <div
                key={index}
                className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-10 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 text-center"
              >
                {/* Circular Photo Frame - BIGGER */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-1.5 rounded-full bg-black overflow-hidden ring-4 ring-red-600/50 group-hover:ring-8 group-hover:ring-red-600 transition-all">
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-3xl font-bold text-white mb-3">{person.name}</h4>
                <p className="text-red-500 font-semibold text-xl">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RT Founders Section - Third */}
        <div className="mb-24">
          <h3 className="text-5xl lg:text-6xl font-bold text-white text-center mb-16 flex items-center justify-center gap-4">
            <Star className="w-14 h-14 text-red-500 fill-red-500" />
            Founders
            <Star className="w-14 h-14 text-red-500 fill-red-500" />
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((person, index) => (
              <div
                key={index}
                className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-10 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 text-center"
              >
                {/* Circular Photo Frame - BIGGER with Animation */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 animate-pulse opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-1.5 rounded-full bg-black overflow-hidden ring-4 ring-red-600/50 group-hover:ring-8 group-hover:ring-red-600 transition-all">
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-3xl font-bold text-white mb-3">{person.name}</h4>
                <p className="text-red-500 font-semibold text-xl mb-6">{person.role}</p>
                
                {/* Social Links - Commented out as in original */}
                {/* {person.social && (
                  <div className="flex justify-center gap-6">
                    {person.social.linkedin && (
                      <a href={person.social.linkedin} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Linkedin size={28} />
                      </a>
                    )}
                    {person.social.instagram && (
                      <a href={person.social.instagram} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Instagram size={28} />
                      </a>
                    )}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA - Commented out as in original */}
        {/* <div className="text-center mt-20">
          <p className="text-gray-300 mb-8 text-3xl">Want to lead rides in your city?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-6 rounded-full font-bold text-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-2xl shadow-red-600/30"
          >
            Become an RT Admin
            <Award className="w-8 h-8" />
          </a>
        </div> */}
      </div>
    </section>
  )
}

export default Team