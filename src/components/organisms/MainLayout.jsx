import React from 'react'
      import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import NavigationItem from '@/components/molecules/NavigationItem'
      import SearchBar from '@/components/molecules/SearchBar'
      import DarkModeToggle from '@/components/molecules/DarkModeToggle'
      import Text from '@/components/atoms/Text'

      const MainLayout = ({
        darkMode,
        toggleDarkMode,
        activeSection,
        setActiveSection,
        navigation,
        searchQuery,
        setSearchQuery,
        handleSearch,
        searchResults,
        showSearchDropdown,
        setShowSearchDropdown,
        trendingTopics,
        children
      }) => {
        const userSuggestions = ['TechGuru', 'DesignPro', 'CodeMaster'] // Hardcoded as per original for now

        return (
          <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
              <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                      <ApperIcon name="MessageCircle" className="text-white" size={18} />
                    </div>
                    <Text as="span" className="text-xl font-bold text-surface-900 dark:text-white">Chirp</Text>
                  </motion.div>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex space-x-6">
                    {navigation.map((item) => (
                      <NavigationItem
                        key={item.id}
                        item={item}
                        active={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                      />
                    ))}
                  </nav>
                </div>

                {/* Search and Controls */}
                <div className="flex items-center space-x-4">
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    searchResults={searchResults}
                    showSearchDropdown={showSearchDropdown}
                    setShowSearchDropdown={setShowSearchDropdown}
                  />
                  <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto flex">
              {/* Left Sidebar - Desktop */}
              <aside className="hidden lg:block w-64 p-6">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <NavigationItem
                      key={item.id}
                      item={item}
                      active={activeSection === item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="w-full"
                      iconSize={20}
                    />
                  ))}
                </nav>
              </aside>

              {/* Center Content */}
              <main className="flex-1 min-h-screen border-x border-surface-200 dark:border-surface-700">
                {children}
              </main>

              {/* Right Sidebar - Desktop */}
              <aside className="hidden xl:block w-80 p-6">
                <div className="space-y-6">
                  {/* Trending Topics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface-100 dark:bg-surface-800 rounded-2xl p-4"
                  >
                    <Text as="h3" className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-4">
                      Trending for you
                    </Text>
                    <div className="space-y-3">
                      {trendingTopics.map((topic, index) => (
                        <motion.div
                          key={topic.tag}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="cursor-pointer hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg p-2 transition-colors duration-200"
                        >
                          <Text as="p" className="font-semibold text-surface-900 dark:text-surface-100">
                            {topic.tag}
                          </Text>
                          <Text as="p" className="text-sm text-surface-500 dark:text-surface-400">
                            {topic.count.toLocaleString()} Chirps
                          </Text>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Suggestions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-surface-100 dark:bg-surface-800 rounded-2xl p-4"
                  >
                    <Text as="h3" className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-4">
                      Who to follow
                    </Text>
                    <div className="space-y-3">
                      {userSuggestions.map((user, index) => (
                        <div key={user} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {user.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <Text as="p" className="font-semibold text-surface-900 dark:text-surface-100">
                                @{user}
                              </Text>
                              <Text as="p" className="text-sm text-surface-500 dark:text-surface-400">
                                Suggested for you
                              </Text>
                            </div>
                          </div>
                          <Button className="px-4 py-1 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark">
                            Follow
                          </Button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </aside>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 md:hidden z-40">
              <div className="flex justify-around py-2">
                {navigation.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    active={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                    isMobile={true}
                  />
                ))}
              </div>
            </nav>
          </div>
        )
      }

      export default MainLayout