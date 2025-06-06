import React, { useState, useEffect } from 'react'
      import { toast } from 'react-toastify'
      import { chirpService } from '@/services'
      import MainLayout from '@/components/organisms/MainLayout'
      import ChirpComposer from '@/components/organisms/ChirpComposer'
      import ChirpFeed from '@/components/organisms/ChirpFeed'

      const HomePage = ({ darkMode, toggleDarkMode }) => {
        const [activeSection, setActiveSection] = useState('home')
        const [searchQuery, setSearchQuery] = useState('')
        const [searchResults, setSearchResults] = useState([])
        const [showSearchDropdown, setShowSearchDropdown] = useState(false)
        const [chirps, setChirps] = useState([])
        const [loading, setLoading] = useState(false)
        const [newChirp, setNewChirp] = useState('')
        const [isPosting, setIsPosting] = useState(false)
        const [likedChirps, setLikedChirps] = useState(new Set())
        const [repostedChirps, setRepostedChirps] = useState(new Set())

        const characterLimit = 280
        const charactersUsed = newChirp.length
        const charactersRemaining = characterLimit - charactersUsed
        const progressPercentage = (charactersUsed / characterLimit) * 100

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
          <MainLayout
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            navigation={navigation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            searchResults={searchResults}
            showSearchDropdown={showSearchDropdown}
            setShowSearchDropdown={setShowSearchDropdown}
            trendingTopics={trendingTopics}
          >
            <div className="max-w-2xl mx-auto">
              <ChirpComposer
                newChirp={newChirp}
                setNewChirp={setNewChirp}
                handlePost={handlePost}
                isPosting={isPosting}
                charactersRemaining={charactersRemaining}
                progressPercentage={progressPercentage}
              />
              <ChirpFeed
                chirps={chirps}
                loading={loading}
                handleLike={handleLike}
                handleRepost={handleRepost}
                likedChirps={likedChirps}
                repostedChirps={repostedChirps}
              />
            </div>
          </MainLayout>
        )
      }

      export default HomePage