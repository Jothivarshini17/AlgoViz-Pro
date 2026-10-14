import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import AlgorithmSelect from './components/AlgorithmSelect'
import ArrayInput from './components/ArrayInput'
import AlgorithmControls from './components/AlgorithmControls'
import VisualizationPanel from './components/VisualizationPanel'
import AuthScreen from './components/AuthScreen'
import Dashboard from './components/Dashboard'
import TopicAnalysis from './components/TopicAnalysis'
import { algorithms } from './data/algorithms'
import { topics } from './data/topics'
import { dataStructureGroups, algorithmGroups } from './data/catalog'
import CatalogSection from './components/CatalogSection'
import { algorithmStepFunctions } from './utils/algorithmSteps'
import { loginUser, signupUser, fetchProgress, saveProgress } from './api'

const parseInput = (text) => {
  return text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((value) => Number(value))
}

const defaultArray = [8, 4, 7, 1, 5, 3]
const defaultTarget = '5'

const navLinks = ['Features', 'Roadmap', 'Testimonials', 'Visualizer']

const experienceHighlights = [
  {
    title: 'Immersive walkthroughs',
    description: 'Step through each operation with cinematic visual pacing and clear explanations.',
    icon: '✦',
  },
  {
    title: 'Adaptive practice',
    description: 'Follow guided learning paths that surface the right concept when you need it.',
    icon: '◌',
  },
  {
    title: 'Premium focus modes',
    description: 'Switch between calm study view and full visualizer mode without losing context.',
    icon: '⬢',
  },
]

const landingFeatures = [
  { title: 'Interactive Visualizer', description: 'Visualize sorting, searching, graph, and tree algorithms with live steps.' },
  { title: 'Practice Problems', description: 'Tackle curated DSA problems with guided hints and solutions.' },
  { title: 'AI Learning Assistant', description: 'Get instant clarifications, hints, and optimized concept explanations.' },
  { title: 'Progress Tracking', description: 'Monitor XP, streaks, and mastery across topics.' },
  { title: 'Quiz Challenges', description: 'Reinforce concepts through quick quizzes after every topic.' },
  { title: 'Complexity Analyzer', description: 'Compare algorithm performance and space/time characteristics.' },
]

const statsHighlights = [
  { value: '200+', label: 'Algorithms' },
  { value: '50+', label: 'Data Structures' },
  { value: '1000+', label: 'Practice Questions' },
  { value: '100K+', label: 'Visualizations' },
]

const roadmapSteps = ['Beginner', 'Intermediate', 'Advanced', 'Interview Ready']

const testimonials = [
  {
    name: 'Maya K.',
    role: 'Software Engineer',
    quote: 'The visualizer made complex concepts feel intuitive and memorable.',
    rating: 5,
  },
  {
    name: 'Noah R.',
    role: 'CS Student',
    quote: 'I love the interactive quizzes and performance analytics after each topic.',
    rating: 5,
  },
  {
    name: 'Lina T.',
    role: 'Interview Prep',
    quote: 'The premium animations kept me engaged and helped me learn faster.',
    rating: 5,
  },
]

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort')
  const [inputText, setInputText] = useState(defaultArray.join(', '))
  const [targetText, setTargetText] = useState(defaultTarget)
  const [steps, setSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedTopicId, setSelectedTopicId] = useState('sorting')
  const [completedTopics, setCompletedTopics] = useState([])
  const [theme, setTheme] = useState('dark')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [authError, setAuthError] = useState('')

  const algorithm = useMemo(
    () => algorithms.find((item) => item.id === selectedAlgorithm),
    [selectedAlgorithm],
  )
  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedTopicId),
    [selectedTopicId],
  )
  const isBinarySearch = selectedAlgorithm === 'binary-search'
  const filteredStructures = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return dataStructureGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0)
  }, [searchQuery])

  const filteredAlgorithms = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return algorithmGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0)
  }, [searchQuery])

  useEffect(() => {
    let timer
    if (running && steps.length > 0 && currentStepIndex < steps.length - 1) {
      timer = window.setTimeout(() => {
        setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1))
      }, 700)
    } else if (steps.length > 0 && currentStepIndex >= steps.length - 1) {
      setRunning(false)
    }
    return () => window.clearTimeout(timer)
  }, [running, steps.length, currentStepIndex])

  const handleRun = () => {
    const values = parseInput(inputText)
    if (values.length === 0 || values.some(Number.isNaN)) {
      window.alert('Please enter a valid comma-separated array of numbers.')
      return
    }

    if (isBinarySearch) {
      const parsedTarget = Number(targetText)
      if (!targetText.trim() || Number.isNaN(parsedTarget)) {
        window.alert('Please enter a valid target number for binary search.')
        return
      }

      const initialSteps = algorithmStepFunctions[selectedAlgorithm](values, parsedTarget)
      setSteps(initialSteps)
      setCurrentStepIndex(0)
      setRunning(true)
      return
    }

    const initialSteps = algorithmStepFunctions[selectedAlgorithm](values)
    setSteps(initialSteps)
    setCurrentStepIndex(0)
    setRunning(true)
  }

  const handlePrevious = () => {
    setRunning(false)
    setCurrentStepIndex((index) => Math.max(0, index - 1))
  }

  const handleNext = () => {
    setRunning(false)
    setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1))
  }

  const handleReset = () => {
    setRunning(false)
    setSteps([])
    setCurrentStepIndex(0)
    setInputText(defaultArray.join(', '))
    setTargetText(defaultTarget)
  }

  const handleAuthSubmit = async (payload) => {
    setAuthError('')
    try {
      if (authMode === 'signup') {
        const result = await signupUser(payload.name, payload.email, payload.password)
        setCurrentUser(result.user)
      } else {
        const result = await loginUser(payload.email, payload.password)
        setCurrentUser(result.user)
        setCompletedTopics(result.progress || [])
      }
      setIsAuthenticated(true)
      setActiveView('dashboard')
    } catch (error) {
      setAuthError(error.message)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveView('dashboard')
    setCurrentUser(null)
    setCompletedTopics([])
    setAuthError('')
  }

  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId)
    setActiveView('topic')
  }

  const handleCompleteTopic = async (topicId) => {
    if (!currentUser) return

    try {
      const result = await saveProgress(currentUser.id, topicId)
      setCompletedTopics(result.progress || [])
    } catch (error) {
      setAuthError(error.message)
    }
  }

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  if (!isAuthenticated) {
    return (
      <main className={`app-shell auth-shell theme-${theme}`}>
        <AuthScreen
          mode={authMode}
          onSubmit={handleAuthSubmit}
          onSwitch={() => {
            setAuthMode(authMode === 'login' ? 'signup' : 'login')
            setAuthError('')
          }}
          error={authError}
        />
      </main>
    )
  }

  return (
    <main className={`app-shell theme-${theme}`}>
      <motion.header
        className="navbar"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-brand">
          <span className="logo-mark">A</span>
          <span className="logo-text">AlgoViz Pro</span>
        </div>
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <button key={link} type="button" className="navbar-link">
              {link}
            </button>
          ))}
        </nav>
        <div className="navbar-actions">
          <button type="button" className="button-secondary" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button type="button" className="button-primary" onClick={() => setActiveView('dashboard')}>
            Get Started
          </button>
        </div>
      </motion.header>

      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">Master DSA visually</p>
          <h1>
            Master Data Structures & Algorithms Through <span className="gradient-text">Interactive Visualizations</span>
          </h1>
          <p className="tagline">
            Learn faster with beautiful animations, step-by-step execution, quizzes, coding practice, and AI-powered explanations.
          </p>
          <div className="hero-cta">
            <button type="button" className="button-primary" onClick={() => setActiveView('dashboard')}>
              Start Learning
            </button>
            <button type="button" className="button-secondary" onClick={() => document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Visualizer
            </button>
          </div>
          <div className="hero-stats">
            {statsHighlights.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-node node-1" />
          <div className="floating-node node-2" />
          <div className="floating-node node-3" />
          <div className="scene-card scene-tree">Binary Tree</div>
          <div className="scene-card scene-graph">Graph Flow</div>
          <div className="scene-card scene-bars">Sorting Bars</div>
        </div>
      </section>

      <section className="feature-section">
        <div className="panel-intro">
          <div>
            <p className="section-label">Platform features</p>
            <h2>Fresh tools for modern DSA learning</h2>
          </div>
          <p className="section-copy">Build skills with visual explanations, practice, AI help, and progress tracking designed for retention.</p>
        </div>
        <div className="feature-grid">
          {landingFeatures.map((feature) => (
            <motion.article
              key={feature.title}
              className="feature-card"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <div className="feature-icon">•</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="roadmap-section">
        <div className="panel-intro">
          <div>
            <p className="section-label">Learning roadmap</p>
            <h2>From beginner to interview ready</h2>
          </div>
        </div>
        <div className="roadmap-timeline">
          {roadmapSteps.map((step, index) => (
            <div key={step} className="roadmap-step">
              <div className="roadmap-marker" />
              <div className="roadmap-content">
                <h3>{step}</h3>
                <p>Click to explore {step.toLowerCase()} concepts and next steps.</p>
              </div>
              {index < roadmapSteps.length - 1 && <div className="roadmap-connector" />}
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="panel-intro">
          <div>
            <p className="section-label">Testimonials</p>
            <h2>What learners say</h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <motion.article key={item.name} className="testimonial-card" whileHover={{ y: -5 }}>
              <p className="testimonial-quote">“{item.quote}”</p>
              <div className="testimonial-meta">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
                <div className="rating">{'★'.repeat(item.rating)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        className="experience-panel"
        id="visualizer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="panel-intro experience-intro">
          <div>
            <p className="section-label">Why learners love it</p>
            <h2>Premium study flow for faster intuition</h2>
          </div>
          <p className="section-copy">
            Blend visual exploration, structured practice, and polished feedback into one fluid learning experience.
          </p>
        </div>
        <div className="feature-grid">
          {experienceHighlights.map((item) => (
            <motion.article key={item.title} className="feature-card" whileHover={{ y: -4, scale: 1.01 }}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {activeView === 'dashboard' && (
        <Dashboard completedTopics={completedTopics} onSelectTopic={handleSelectTopic} onLogout={handleLogout} />
      )}

      {activeView === 'topic' && selectedTopic && (
        <TopicAnalysis topic={selectedTopic} onComplete={handleCompleteTopic} />
      )}

      <section className="catalog-panel">
        <div className="panel-intro">
          <div>
            <p className="section-label">Learning catalog</p>
            <h2>Explore DSA concepts</h2>
          </div>
          <input
            className="search-input"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search data structures or algorithms"
          />
        </div>

        <div className="catalog-stack">
          {filteredStructures.map((group) => (
            <CatalogSection key={group.title} title={group.title} items={group.items} accent="#06B6D4" />
          ))}
          {filteredAlgorithms.map((group) => (
            <CatalogSection key={group.title} title={group.title} items={group.items} accent="#7C3AED" />
          ))}
        </div>
      </section>

      <section className="controls-panel">
        <div className="panel-intro">
          <div>
            <p className="section-label">Interactive controls</p>
            <h2>Build your own demo</h2>
          </div>
          <p className="section-copy">
            Pick an algorithm, enter your values, and step through each change with confidence.
          </p>
        </div>

        <div className="control-grid">
          <AlgorithmSelect selected={selectedAlgorithm} onChange={setSelectedAlgorithm} />
          <ArrayInput value={inputText} onChange={setInputText} />
          <div className="control-group">
            <label htmlFor="target-input">Target value</label>
            <input
              id="target-input"
              type="number"
              value={targetText}
              onChange={(event) => setTargetText(event.target.value)}
              placeholder="e.g. 5"
              disabled={!isBinarySearch}
            />
            <p className="hint">
              {isBinarySearch ? 'Use a single number for binary search' : 'Only needed for binary search'}
            </p>
          </div>
        </div>

        <AlgorithmControls
          onRun={handleRun}
          onReset={handleReset}
          onPrevious={handlePrevious}
          onNext={handleNext}
          running={running}
          canGoBack={currentStepIndex > 0}
          canGoForward={steps.length > 0 && currentStepIndex < steps.length - 1}
        />
      </section>

      <section className="visualization-panel">
        <div className="panel-header">
          <div>
            <p className="section-label">Live visualization</p>
            <h2>{algorithm?.name || 'Algorithm'}</h2>
            <p>{algorithm?.description || 'Select an algorithm to visualize its steps.'}</p>
          </div>
          <div className="stats-stack">
            <div className="stat-chip">{algorithm?.category || 'Algorithm'}</div>
            <div className="stat-chip">{algorithm?.complexity || '—'}</div>
          </div>
        </div>

        <div className="insight-grid">
          <div className="insight-card">
            <h3>Why it matters</h3>
            <p>{algorithm?.useCase || 'Choose an algorithm to see how it behaves.'}</p>
          </div>
          <div className="insight-card">
            <h3>Highlights</h3>
            <ul>
              {algorithm?.highlights?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="step-tracker">
          Step {steps.length > 0 ? currentStepIndex + 1 : 0} of {steps.length}
        </div>

        <VisualizationPanel
          step={steps[currentStepIndex]}
          algorithmId={selectedAlgorithm}
          target={isBinarySearch ? Number(targetText) : null}
        />
      </section>

      <footer className="page-footer">
        <div>
          <p className="section-label">AlgoViz Pro</p>
          <h3>Build a stronger DSA foundation with confidence.</h3>
        </div>
        <div className="footer-links">
          <a href="#">Support</a>
          <a href="#">Docs</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </main>
  )
}

export default App
