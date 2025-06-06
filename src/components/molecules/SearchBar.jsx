import React from 'react'
      import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Input from '@/components/atoms/Input'
      import Text from '@/components/atoms/Text'

      const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, searchResults, showSearchDropdown, setShowSearchDropdown }) => {
        return (
          <div className="relative hidden sm:block">
            <div className="relative">
              <ApperIcon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400"
                size={16}
              />
              <Input
                type="text"
                placeholder="Search Chirp"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  handleSearch(e.target.value)
                }}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                className="w-64 pl-10 pr-4"
              />
            </div>

            {showSearchDropdown && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-full bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 py-2 z-50"
              >
                {searchResults.slice(0, 5).map((chirp) => (
                  <div
                    key={chirp.id}
                    className="px-4 py-2 hover:bg-surface-50 dark:hover:bg-surface-700 cursor-pointer"
                  >
                    <Text as="p" className="text-sm text-surface-900 dark:text-surface-100 truncate">
                      {chirp.content}
                    </Text>
                    <Text as="p" className="text-xs text-surface-500 dark:text-surface-400">
                      by @{chirp.author}
                    </Text>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )
      }

      export default SearchBar