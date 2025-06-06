import React from 'react'
      import { motion } from 'framer-motion'
      import { formatDistanceToNow } from 'date-fns'
      import ApperIcon from '@/components/ApperIcon'
      import Avatar from '@/components/atoms/Avatar'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'

      const ChirpCard = ({ chirp, handleLike, handleRepost, likedChirps, repostedChirps, index }) => {
        const renderHashtags = (content) => {
          if (!content) return content
          return content.split(' ').map((word, idx) => {
            if (word.startsWith('#')) {
              return (
                <span key={idx} className="text-primary hover:underline cursor-pointer">
                  {word}{' '}
                </span>
              )
            }
            return word + ' '
          })
        }

        const isLiked = likedChirps.has(chirp.id)
        const isReposted = repostedChirps.has(chirp.id)

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-surface-200 dark:border-surface-700 p-6 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex space-x-4">
              <Avatar char={chirp.author?.charAt(0) || 'U'} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Text as="h4" className="font-semibold text-surface-900 dark:text-surface-100">
                    @{chirp.author || 'Unknown'}
                  </Text>
                  <Text as="span" className="text-surface-500 dark:text-surface-400 text-sm">
                    ·
                  </Text>
                  <Text as="span" className="text-surface-500 dark:text-surface-400 text-sm">
                    {chirp.timestamp ? formatDistanceToNow(new Date(chirp.timestamp), { addSuffix: true }) : 'Just now'}
                  </Text>
                </div>

                <Text as="p" className="text-surface-900 dark:text-surface-100 mb-3 leading-relaxed">
                  {renderHashtags(chirp.content)}
                </Text>

                <div className="flex items-center space-x-8">
                  <Button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(chirp.id)}
                    className={`flex items-center space-x-2 group ${
                      isLiked
                        ? 'text-red-500'
                        : 'text-surface-500 dark:text-surface-400 hover:text-red-500'
                    }`}
                  >
                    <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors duration-200">
                      <ApperIcon
                        name={isLiked ? "Heart" : "Heart"}
                        size={16}
                        className={isLiked ? "fill-current" : ""}
                      />
                    </div>
                    <Text as="span" className="text-sm">{chirp.likes || 0}</Text>
                  </Button>

                  <Button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRepost(chirp.id)}
                    className={`flex items-center space-x-2 group ${
                      isReposted
                        ? 'text-green-500'
                        : 'text-surface-500 dark:text-surface-400 hover:text-green-500'
                    }`}
                  >
                    <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors duration-200">
                      <ApperIcon name="Repeat2" size={16} />
                    </div>
                    <Text as="span" className="text-sm">{chirp.reposts || 0}</Text>
                  </Button>

                  <Button className="flex items-center space-x-2 text-surface-500 dark:text-surface-400 hover:text-primary group">
                    <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors duration-200">
                      <ApperIcon name="MessageCircle" size={16} />
                    </div>
                  </Button>

                  <Button className="flex items-center space-x-2 text-surface-500 dark:text-surface-400 hover:text-primary group">
                    <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors duration-200">
                      <ApperIcon name="Share" size={16} />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )
      }

      export default ChirpCard