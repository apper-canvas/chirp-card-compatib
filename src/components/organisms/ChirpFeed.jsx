import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import ChirpCard from '@/components/molecules/ChirpCard'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'

      const ChirpFeed = ({ chirps, loading, handleLike, handleRepost, likedChirps, repostedChirps }) => {
        if (loading) {
          return (
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
          )
        }

        if (!chirps || chirps.length === 0) {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
                <ApperIcon name="MessageCircle" className="text-surface-400" size={24} />
              </div>
              <Text as="h3" className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                No chirps yet
              </Text>
              <Text as="p" className="text-surface-500 dark:text-surface-400">
                Be the first to share what's happening!
              </Text>
            </motion.div>
          )
        }

        return (
          <AnimatePresence>
            {chirps.map((chirp, index) => (
              <ChirpCard
                key={chirp.id}
                chirp={chirp}
                index={index}
                handleLike={handleLike}
                handleRepost={handleRepost}
                likedChirps={likedChirps}
                repostedChirps={repostedChirps}
              />
            ))}
          </AnimatePresence>
        )
      }

      export default ChirpFeed