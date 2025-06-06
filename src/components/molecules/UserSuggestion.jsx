import React from 'react'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import Avatar from '@/components/atoms/Avatar'

      const UserSuggestion = ({ user }) => {
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar char={user.charAt(0)} size="medium" />
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
        )
      }

      export default UserSuggestion