import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { chirpService } from '../services'

const Home = ({ darkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [chirps, setChirps] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadChirps = async () => {
      setLoading(true)
      try {
        const result = await chirpService.getAll()
        setChirps(result)
      } catch (err) {
        console.error('Failed to load chirps:', err)
      } finally {
        setLoading(false)
      }
    }
    loadChirps()
  }, [])

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowSearchDropdown(false)
      return
    }

    try {
      const results = chirps.filter(chirp => 
        chirp.content?.toLowerCase().includes(query.toLowerCase()) ||
        chirp.hashtags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      setSearchResults(results)
      setShowSearchDropdown(true)
    } catch (err) {
      console.error('Search failed:', err)
    }
  }

  const navigation = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Hash' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ]

  const trendingTopics = [
    { tag: '#TechNews', count: 12500 },
    { tag: '#WebDev', count: 8200 },
    { tag: '#React', count: 6700 },
    { tag: '#AI', count: 15300 },
    { tag: '#Startup', count: 4200 }
  ]

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
              <span className="text-xl font-bold text-surface-900 dark:text-white">Chirp</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <div className="relative">
                <ApperIcon 
                  name="Search" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" 
                  size={16} 
                />
                <input
                  type="text"
                  placeholder="Search Chirp"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleSearch(e.target.value)
                  }}
                  onFocus={() => searchQuery && setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  className="w-64 pl-10 pr-4 py-2 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>

              {/* Search Dropdown */}
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
                      <p className="text-sm text-surface-900 dark:text-surface-100 truncate">
                        {chirp.content}
                      </p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        by @{chirp.author}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="text-surface-600 dark:text-surface-400" 
                size={18} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto flex">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 p-6">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-h-screen border-x border-surface-200 dark:border-surface-700">
          <MainFeature 
            chirps={chirps} 
            setChirps={setChirps} 
            loading={loading}
          />
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
              <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-4">
                Trending for you
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.tag}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="cursor-pointer hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg p-2 transition-colors duration-200"
                  >
                    <p className="font-semibold text-surface-900 dark:text-surface-100">
                      {topic.tag}
                    </p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {topic.count.toLocaleString()} Chirps
                    </p>
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
              <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-4">
                Who to follow
              </h3>
              <div className="space-y-3">
                {['TechGuru', 'DesignPro', 'CodeMaster'].map((user, index) => (
                  <div key={user} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-surface-900 dark:text-surface-100">
                          @{user}
                        </p>
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                          Suggested for you
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-1 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors duration-200">
                      Follow
                    </button>
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
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-primary'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Home