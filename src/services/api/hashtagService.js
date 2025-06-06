import hashtagData from '../mockData/hashtag.json'

class HashtagService {
  constructor() {
    this.hashtags = [...hashtagData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return this.hashtags.map(hashtag => ({ ...hashtag }))
  }

  async getById(tag) {
    await this.delay()
    const hashtag = this.hashtags.find(h => h.tag === tag)
    return hashtag ? { ...hashtag } : null
  }

  async create(hashtagData) {
    await this.delay()
    const newHashtag = {
      ...hashtagData,
      count: 1,
      trending: false
    }
    this.hashtags.push(newHashtag)
    return { ...newHashtag }
  }

  async update(tag, updates) {
    await this.delay()
    const index = this.hashtags.findIndex(h => h.tag === tag)
    if (index === -1) throw new Error('Hashtag not found')
    
    this.hashtags[index] = { ...this.hashtags[index], ...updates }
    return { ...this.hashtags[index] }
  }

  async delete(tag) {
    await this.delay()
    const index = this.hashtags.findIndex(h => h.tag === tag)
    if (index === -1) throw new Error('Hashtag not found')
    
    const deleted = this.hashtags.splice(index, 1)[0]
    return { ...deleted }
  }

  async getTrending() {
    await this.delay()
    const trending = this.hashtags
      .filter(hashtag => hashtag.trending)
      .sort((a, b) => b.count - a.count)
    return trending.map(hashtag => ({ ...hashtag }))
  }

  async incrementCount(tag) {
    await this.delay()
    const index = this.hashtags.findIndex(h => h.tag === tag)
    if (index !== -1) {
      this.hashtags[index].count++
      return { ...this.hashtags[index] }
    }
    return null
  }
}

export default new HashtagService()