import React from 'react'
      import NavigationItem from '@/components/molecules/NavigationItem'

      const SideNavigation = ({ navigation, activeSection, setActiveSection }) => {
        return (
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
        )
      }

      export default SideNavigation