import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const NavigationItem = ({ item, active, onClick, isMobile = false }) => {
        const baseClasses = "transition-all duration-200"
        const activeClasses = "bg-primary/10 text-primary dark:bg-primary/20"
        const inactiveClasses = "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"

        return (
          <Button
            key={item.id}
            onClick={onClick}
            className={`flex items-center space-x-2 p-3 rounded-xl ${baseClasses} ${active ? activeClasses : inactiveClasses} ${isMobile ? 'flex-col space-y-1 p-3' : 'px-3 py-2'}`}
          >
            <ApperIcon name={item.icon} size={isMobile ? 20 : 18} />
            <Text as="span" className={`${isMobile ? 'text-xs' : 'font-medium'}`}>{item.label}</Text>
          </Button>
        )
      }

      export default NavigationItem