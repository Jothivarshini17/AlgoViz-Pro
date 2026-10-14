const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'store.json')

app.use(cors())
app.use(express.json())

function ensureDataStore() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ users: [], progress: {} }, null, 2))
  }
}

function loadStore() {
  ensureDataStore()

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      progress: parsed.progress && typeof parsed.progress === 'object' ? parsed.progress : {},
    }
  } catch (error) {
    console.warn('Unable to read data store, using a fresh in-memory state.', error.message)
    return { users: [], progress: {} }
  }
}

function persistStore(store) {
  ensureDataStore()
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2))
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

let store = loadStore()
let users = store.users
let progress = store.progress

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AlgoViz Pro API is running' })
})

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body || {}

  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Please provide a valid name, email, and password.' })
  }

  const trimmedName = name.trim()
  const trimmedEmail = email.trim().toLowerCase()
  const trimmedPassword = password.trim()

  if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    return res.status(400).json({ message: 'Please provide a name, email, and password.' })
  }

  if (trimmedPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' })
  }

  const existingUser = users.find((user) => user.email === trimmedEmail)
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists.' })
  }

  const user = { id: Date.now().toString(), name: trimmedName, email: trimmedEmail, password: trimmedPassword }
  users.push(user)
  progress[user.id] = []
  persistStore({ users, progress })

  res.status(201).json({ message: 'User registered successfully', user: sanitizeUser(user) })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Please provide a valid email and password.' })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const normalizedPassword = password.trim()

  const user = users.find((item) => item.email === normalizedEmail && item.password === normalizedPassword)
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  res.json({
    message: 'Login successful',
    user: sanitizeUser(user),
    progress: progress[user.id] || [],
  })
})

app.get('/api/progress/:userId', (req, res) => {
  const { userId } = req.params
  const user = users.find((item) => item.id === userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  res.json({ progress: progress[userId] || [] })
})

app.post('/api/progress/:userId', (req, res) => {
  const { userId } = req.params
  const { topicId } = req.body || {}
  const user = users.find((item) => item.id === userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  if (typeof topicId !== 'string' || !topicId.trim()) {
    return res.status(400).json({ message: 'A topicId is required.' })
  }

  if (!Array.isArray(progress[userId])) {
    progress[userId] = []
  }

  if (!progress[userId].includes(topicId)) {
    progress[userId].push(topicId)
  }

  persistStore({ users, progress })
  res.json({ progress: progress[userId] })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong on the server.' })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`AlgoViz Pro API running on http://localhost:${PORT}`)
  })
}

module.exports = app
