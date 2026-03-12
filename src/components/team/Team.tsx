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
  
}

const Team: React.FC = () => {
  // RT Admins - First
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
    { name: "Arun Hilson", role: "RT Advisory", image: rider },
    { name: "Lohith Bittira", role: "RT Advisory", image: lohith },
    { name: "Kamal Chodri", role: "RT Advisory", image: kamal },
  ]

  // RT Founders - Third
  const founders: TeamMember[] = [
    { name: "Jacinth Paul", role: "Founder", image: rider },
    { name: "Tudu", role: "Founder", image: rider },
    { name: "Arpan Laha", role: "Founder", image: arpan },
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
    <section id="team" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={teamBg}
          alt="Team background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header - Mobile optimized */}
        <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-red-500 font-semibold text-lg sm:text-xl lg:text-2xl uppercase tracking-wider mb-3 sm:mb-4 lg:mb-6 block">THE TEAM</span>
          <h2 className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 sm:mb-6 lg:mb-8">
            Team<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Road Thrill</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-3xl max-w-4xl mx-auto leading-relaxed px-4">
            The passionate individuals who make Road Thrill an incredible community of bikers.
          </p>
        </div>

        {/* RT Admins Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-8 sm:mb-12 lg:mb-16 flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-red-500" />
            <span>RT Admin Team</span>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-red-500" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
            {admins.map((person, index) => (
              <div
                key={index}
                className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300"
              >
                <div className="relative h-64 sm:h-72 lg:h-80 xl:h-96 w-full overflow-hidden">
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
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center">
                        {getInitials(person.name)}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 xl:p-8 text-center">
                    <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1 sm:mb-2 lg:mb-3">{person.name}</h4>
                    <p className="text-red-500 font-semibold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-1 sm:gap-2">
                      <MapPin size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500" />
                      {person.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RT Advisory Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-8 sm:mb-12 lg:mb-16 flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-red-500" />
            <span>RT Advisory</span>
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-red-500" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
            {advisory.map((person, index) => (
              <div
                key={index}
                className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 text-center"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 mx-auto mb-4 sm:mb-6 lg:mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-1 sm:inset-1.5 rounded-full bg-black overflow-hidden ring-2 sm:ring-4 ring-red-600/50 group-hover:ring-4 sm:group-hover:ring-8 group-hover:ring-red-600 transition-all">
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
                      <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 sm:mb-3">{person.name}</h4>
                <p className="text-red-500 font-semibold text-sm sm:text-base lg:text-lg xl:text-xl">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RT Founders Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-8 sm:mb-12 lg:mb-16 flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-red-500 fill-red-500" />
            <span>Founders</span>
            <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-red-500 fill-red-500" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
            {founders.map((person, index) => (
              <div
                key={index}
                className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 text-center"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 mx-auto mb-4 sm:mb-6 lg:mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 animate-pulse opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-1 sm:inset-1.5 rounded-full bg-black overflow-hidden ring-2 sm:ring-4 ring-red-600/50 group-hover:ring-4 sm:group-hover:ring-8 group-hover:ring-red-600 transition-all">
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
                      <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 sm:mb-3">{person.name}</h4>
                <p className="text-red-500 font-semibold text-sm sm:text-base lg:text-lg xl:text-xl">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team