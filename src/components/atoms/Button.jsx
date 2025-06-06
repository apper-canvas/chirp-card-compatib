import React from 'react'
      import { motion } from 'framer-motion'

      const Button = ({ children, onClick, className = '', disabled = false, whileHover, whileTap, icon: Icon, iconSize = 18, ...props }) => {
        const baseClasses = `transition-all duration-200 flex items-center justify-center`
        const dynamicClasses = `
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `

        return (
          <motion.button
            whileHover={!disabled ? (whileHover || { scale: 1.05 }) : {}}
            whileTap={!disabled ? (whileTap || { scale: 0.95 }) : {}}
            onClick={onClick}
            className={`${baseClasses} ${dynamicClasses}`}
            disabled={disabled}
            {...props}
          >
            {Icon && <Icon size={iconSize} className={children ? 'mr-2' : ''} />}
            {children}
          </motion.button>
        )
      }

      export default Button