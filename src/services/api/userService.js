import userData from '../mockData/user.json'

class UserService {
  constructor() {
    this.users = [...userData]
    this.nextId = Math.max(...this.users.map(u => parseInt(u.id))) + 1
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return this.users.map(user => ({ ...user }))
  }

  async getById(id) {
    await this.delay()
    const user = this.users.find(u => u.id === id)
    return user ? { ...user } : null
  }

  async create(userData) {
    await this.delay()
    const newUser = {
      ...userData,
      id: this.nextId.toString(),
      joinDate: new Date().toISOString(),
      chirpCount: 0
    }
    this.nextId++
    this.users.push(newUser)
    return { ...newUser }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    
    this.users[index] = { ...this.users[index], ...updates }
    return { ...this.users[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    
    const deleted = this.users.splice(index, 1)[0]
    return { ...deleted }
  }

  async searchByUsername(username) {
    await this.delay()
    const results = this.users.filter(user => 
      user.username?.toLowerCase().includes(username.toLowerCase())
    )
    return results.map(user => ({ ...user }))
  }
}

export default new UserService()