import chirpData from '../mockData/chirp.json'

class ChirpService {
  constructor() {
    this.chirps = [...chirpData]
    this.nextId = Math.max(...this.chirps.map(c => parseInt(c.id))) + 1
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.chirps].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  async getById(id) {
    await this.delay()
    const chirp = this.chirps.find(c => c.id === id)
    return chirp ? { ...chirp } : null
  }

  async create(chirpData) {
    await this.delay()
    const newChirp = {
      ...chirpData,
      id: this.nextId.toString(),
      timestamp: new Date().toISOString(),
      likes: 0,
      reposts: 0
    }
    this.nextId++
    this.chirps.unshift(newChirp)
    return { ...newChirp }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.chirps.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Chirp not found')
    
    this.chirps[index] = { ...this.chirps[index], ...updates }
    return { ...this.chirps[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.chirps.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Chirp not found')
    
    const deleted = this.chirps.splice(index, 1)[0]
    return { ...deleted }
  }

  async searchByContent(query) {
    await this.delay()
    const results = this.chirps.filter(chirp => 
      chirp.content?.toLowerCase().includes(query.toLowerCase())
    )
    return results.map(chirp => ({ ...chirp }))
  }

  async getByHashtag(hashtag) {
    await this.delay()
    const results = this.chirps.filter(chirp => 
      chirp.hashtags?.includes(hashtag)
    )
    return results.map(chirp => ({ ...chirp }))
  }
}

export default new ChirpService()