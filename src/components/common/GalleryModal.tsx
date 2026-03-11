import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Download, Camera } from 'lucide-react'

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  title: string
  currentIndex?: number
}

const GalleryModal: React.FC<GalleryModalProps> = ({ 
  isOpen, 
  onClose, 
  images, 
  title,
  currentIndex = 0 
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeIndex])

  const goToPrevious = () => {
    setIsLoading(true)
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setIsLoading(true)
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3 text-white">
              <Camera size={20} className="text-red-500" />
              <span className="font-semibold">{title}</span>
              <span className="text-sm text-gray-400">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-[80vh] w-full h-full flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={images[activeIndex]}
                alt={`${title} - Image ${activeIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
                onLoad={handleImageLoad}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src = `https://via.placeholder.com/800x600/1a1a1a/DC2626?text=Image+${activeIndex + 1}`
                }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 z-10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsLoading(true)
                      setActiveIndex(index)
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeIndex 
                        ? 'border-red-600 scale-110' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = `https://via.placeholder.com/60x60/1a1a1a/DC2626?text=${index + 1}`
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GalleryModal