import React from 'react'

      const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
        const baseClasses = `
          w-full px-4 py-2 
          bg-surface-100 dark:bg-surface-800 
          border border-surface-200 dark:border-surface-700 
          rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary 
          transition-all duration-200
          text-surface-900 dark:text-surface-100
        `
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClasses} ${className}`}
            {...props}
          />
        )
      }

      export default Input