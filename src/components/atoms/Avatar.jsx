import React from 'react'

      const Avatar = ({ char, size = 'medium', src, alt, className = '' }) => {
        const sizeClasses = {
          small: 'w-8 h-8 text-sm',
          medium: 'w-10 h-10 text-sm',
          large: 'w-12 h-12 text-base',
        }

        const combinedClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center flex-shrink-0 ${className}`

        if (src) {
          return (
            <img
              src={src}
              alt={alt}
              className={`${combinedClasses} object-cover`}
            />
          )
        }

        return (
          <div className={`${combinedClasses} bg-gradient-to-br from-primary to-accent`}>
            <span className="text-white font-bold">{char.toUpperCase()}</span>
          </div>
        )
      }

      export default Avatar