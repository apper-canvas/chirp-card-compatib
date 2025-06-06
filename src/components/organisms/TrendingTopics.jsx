import React from 'react'
      import { motion } from 'framer-motion'
      import Text from '@/components/atoms/Text'
      import UserSuggestion from '@/components/molecules/UserSuggestion'

      const TrendingTopics = ({ trendingTopics }) => {
        const userSuggestions = ['TechGuru', 'DesignPro', 'CodeMaster']

        return (
          <aside className="hidden xl:block w-80 p-6">
            <div className="space-y-6">
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
                  {userSuggestions.map((user) => (
                    <UserSuggestion key={user} user={user} />
                  ))}
                </div>
              </motion.div>
            </div>
          </aside>
        )
      }

      export default TrendingTopics