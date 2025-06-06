import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'

      const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
        return (
          <Button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700"
          >
            <ApperIcon
              name={darkMode ? "Sun" : "Moon"}
              className="text-surface-600 dark:text-surface-400"
              size={18}
            />
          </Button>
        )
      }

      export default DarkModeToggle