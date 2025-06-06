import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from './ApperIcon'
import { chirpService } from '../services'

const MainFeature = ({ chirps, setChirps, loading }) => {
  const [newChirp, setNewChirp] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [likedChirps, setLikedChirps] = useState(new Set())
  const [repostedChirps, setRepostedChirps] = useState(new Set())

  const characterLimit = 280
  const charactersUsed = newChirp.length
  const charactersRemaining = characterLimit - charactersUsed
  const progressPercentage = (charactersUsed / characterLimit) * 100

  const handlePost = async () => {
    if (!newChirp.trim() || charactersUsed > characterLimit) return

    setIsPosting(true)
    try {
      const hashtags = newChirp.match(/#\w+/g) || []
      const chirpData = {
        content: newChirp.trim(),
        author: 'CurrentUser',
        timestamp: new Date().toISOString(),
        likes: 0,
        reposts: 0,
        hashtags: hashtags
      }

      const createdChirp = await chirpService.create(chirpData)
      setChirps(prev => [createdChirp, ...prev])
      setNewChirp('')
      toast.success('Chirp posted successfully!')
    } catch (error) {
      toast.error('Failed to post chirp')
    } finally {
      setIsPosting(false)
    }
  }

  const handleLike = async (chirpId) => {
    try {
      const chirp = chirps.find(c => c.id === chirpId)
      if (!chirp) return

      const isLiked = likedChirps.has(chirpId)
      const newLikes = isLiked ? chirp.likes - 1 : chirp.likes + 1

      await chirpService.update(chirpId, { likes: newLikes })
      
      setChirps(prev => prev.map(c => 
        c.id === chirpId ? { ...c, likes: newLikes } : c
      ))

      setLikedChirps(prev => {
        const newSet = new Set(prev)
        if (isLiked) {
          newSet.delete(chirpId)
        } else {
          newSet.add(chirpId)
        }
        return newSet
      })

      toast.success(isLiked ? 'Like removed' : 'Chirp liked!')
    } catch (error) {
      toast.error('Failed to update like')
    }
  }

  const handleRepost = async (chirpId) => {
    try {
      const chirp = chirps.find(c => c.id === chirpId)
      if (!chirp) return

      const isReposted = repostedChirps.has(chirpId)
      const newReposts = isReposted ? chirp.reposts - 1 : chirp.reposts + 1

      await chirpService.update(chirpId, { reposts: newReposts })
      
      setChirps(prev => prev.map(c => 
        c.id === chirpId ? { ...c, reposts: newReposts } : c
      ))

      setRepostedChirps(prev => {
        const newSet = new Set(prev)
        if (isReposted) {
          newSet.delete(chirpId)
        } else {
          newSet.add(chirpId)
        }
        return newSet
      })

      toast.success(isReposted ? 'Repost removed' : 'Chirp reposted!')
    } catch (error) {
      toast.error('Failed to update repost')
    }
  }

  const renderHashtags = (content) => {
    if (!content) return content
    return content.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="text-primary hover:underline cursor-pointer">
            {word}{' '}
          </span>
        )
      }
      return word + ' '
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Chirp Composer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 p-6"
      >
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">U</span>
          </div>
          
          <div className="flex-1">
            <textarea
              value={newChirp}
              onChange={(e) => setNewChirp(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent text-xl placeholder-surface-400 dark:placeholder-surface-500 text-surface-900 dark:text-surface-100 resize-none border-none focus:outline-none"
              rows={3}
              style={{ minHeight: '60px' }}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-primary/10 rounded-full transition-colors duration-200">
                  <ApperIcon name="Image" className="text-primary" size={18} />
                </button>
                <button className="p-2 hover:bg-primary/10 rounded-full transition-colors duration-200">
                  <ApperIcon name="Smile" className="text-primary" size={18} />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                {charactersUsed > 0 && (
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full character-counter flex items-center justify-center"
                      style={{ '--progress': `${Math.min(progressPercentage, 100) * 3.6}deg` }}
                    >
                      <div className="w-4 h-4 bg-white dark:bg-surface-800 rounded-full"></div>
                    </div>
                    <span className={`text-sm ${
                      charactersRemaining < 20 
                        ? 'text-red-500' 
                        : 'text-surface-500 dark:text-surface-400'
                    }`}>
                      {charactersRemaining}
                    </span>
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePost}
                  disabled={!newChirp.trim() || charactersUsed > characterLimit || isPosting}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    newChirp.trim() && charactersUsed <= characterLimit && !isPosting
                      ? 'bg-primary hover:bg-primary-dark text-white'
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
                  }`}
                >
                  {isPosting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </div>
                  ) : (
                    'Chirp'
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chirps Feed */}
      <div className="bg-white dark:bg-surface-800">
        {loading ? (
          <div className="space-y-4 p-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-surface-200 dark:bg-surface-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/4"></div>
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4"></div>
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {chirps?.map((chirp, index) => (
              <motion.div
                key={chirp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-surface-200 dark:border-surface-700 p-6 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">
                      {chirp.author?.charAt(0) || 'U'}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                        @{chirp.author || 'Unknown'}
                      </h4>
                      <span className="text-surface-500 dark:text-surface-400 text-sm">
                        ·
                      </span>
                      <span className="text-surface-500 dark:text-surface-400 text-sm">
                        {chirp.timestamp ? formatDistanceToNow(new Date(chirp.timestamp), { addSuffix: true }) : 'Just now'}
                      </span>
                    </div>
                    
                    <p className="text-surface-900 dark:text-surface-100 mb-3 leading-relaxed">
                      {renderHashtags(chirp.content)}
                    </p>
                    
                    <div className="flex items-center space-x-8">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(chirp.id)}
                        className={`flex items-center space-x-2 group ${
                          likedChirps.has(chirp.id) 
                            ? 'text-red-500' 
                            : 'text-surface-500 dark:text-surface-400 hover:text-red-500'
                        }`}
                      >
                        <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors duration-200">
                          <ApperIcon 
                            name={likedChirps.has(chirp.id) ? "Heart" : "Heart"} 
                            size={16}
                            className={likedChirps.has(chirp.id) ? "fill-current" : ""}
                          />
                        </div>
                        <span className="text-sm">{chirp.likes || 0}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRepost(chirp.id)}
                        className={`flex items-center space-x-2 group ${
                          repostedChirps.has(chirp.id) 
                            ? 'text-green-500' 
                            : 'text-surface-500 dark:text-surface-400 hover:text-green-500'
                        }`}
                      >
                        <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors duration-200">
                          <ApperIcon name="Repeat2" size={16} />
                        </div>
                        <span className="text-sm">{chirp.reposts || 0}</span>
                      </motion.button>
                      
                      <button className="flex items-center space-x-2 text-surface-500 dark:text-surface-400 hover:text-primary group">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors duration-200">
                          <ApperIcon name="MessageCircle" size={16} />
                        </div>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-surface-500 dark:text-surface-400 hover:text-primary group">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors duration-200">
                          <ApperIcon name="Share" size={16} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {!loading && (!chirps || chirps.length === 0) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
              <ApperIcon name="MessageCircle" className="text-surface-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
              No chirps yet
            </h3>
            <p className="text-surface-500 dark:text-surface-400">
              Be the first to share what's happening!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MainFeature