import React from 'react'
      import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Avatar from '@/components/atoms/Avatar'
      import Text from '@/components/atoms/Text'

      const ChirpComposer = ({ newChirp, setNewChirp, handlePost, isPosting, charactersRemaining, progressPercentage }) => {
        const charactersUsed = newChirp.length
        const characterLimit = 280

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 p-6"
          >
            <div className="flex space-x-4">
              <Avatar char="U" />

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
                    <Button className="p-2 hover:bg-primary/10 rounded-full">
                      <ApperIcon name="Image" className="text-primary" size={18} />
                    </Button>
                    <Button className="p-2 hover:bg-primary/10 rounded-full">
                      <ApperIcon name="Smile" className="text-primary" size={18} />
                    </Button>
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
                        <Text as="span" className={`text-sm ${
                          charactersRemaining < 20
                            ? 'text-red-500'
                            : 'text-surface-500 dark:text-surface-400'
                        }`}>
                          {charactersRemaining}
                        </Text>
                      </div>
                    )}

                    <Button
                      onClick={handlePost}
                      disabled={!newChirp.trim() || charactersUsed > characterLimit || isPosting}
                      className={`px-6 py-2 rounded-full font-medium ${
                        newChirp.trim() && charactersUsed <= characterLimit && !isPosting
                          ? 'bg-primary hover:bg-primary-dark text-white'
                          : 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
                      }`}
                    >
                      {isPosting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <Text as="span">Posting...</Text>
                        </div>
                      ) : (
                        'Chirp'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      }

      export default ChirpComposer