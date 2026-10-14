const API_BASE_URL = 'http://localhost:5000/api'

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Login failed')
  }

  return data
}

export async function signupUser(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Signup failed')
  }

  return data
}

export async function fetchProgress(userId) {
  const response = await fetch(`${API_BASE_URL}/progress/${userId}`)
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch progress')
  }
  return data
}

export async function saveProgress(userId, topicId) {
  const response = await fetch(`${API_BASE_URL}/progress/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicId }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to save progress')
  }

  return data
}
