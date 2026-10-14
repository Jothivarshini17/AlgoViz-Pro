import { topics } from '../data/topics'

export default function Dashboard({ completedTopics, onSelectTopic, onLogout }) {
  const progress = Math.round((completedTopics.length / topics.length) * 100)
  const nextTopics = topics.filter((topic) => !completedTopics.includes(topic.id)).slice(0, 3)

  return (
    <section className="dashboard-card">
      <div className="dashboard-hero">
        <div>
          <p className="section-label">Dashboard</p>
          <h2>DSA learning roadmap</h2>
          <p className="section-copy">
            Keep momentum strong with curated topics, progress insights, and quick next steps.
          </p>
        </div>
        <div className="dashboard-actions">
          <span className="pill-chip">XP 340</span>
          <button type="button" className="button-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-overview">
        <div className="overview-card overview-hero">
          <h3>Welcome back</h3>
          <p>Continue building intuition for data structures and algorithms through immersive practice.</p>
          <div className="overview-metrics">
            <div>
              <strong>{completedTopics.length}</strong>
              <span>Completed topics</span>
            </div>
            <div>
              <strong>{progress}%</strong>
              <span>Progress</span>
            </div>
          </div>
        </div>
        <div className="overview-card">
          <h3>Daily streak</h3>
          <p>7 days</p>
          <span className="mini-pill">Consistent growth</span>
        </div>
        <div className="overview-card">
          <h3>Achievements</h3>
          <p>3 unlocked</p>
          <span className="mini-pill">Visualizer master</span>
        </div>
      </div>

      <div className="dashboard-rail">
        <div className="dashboard-panel">
          <div className="panel-intro">
            <div>
              <p className="section-label">Continue learning</p>
              <h3>Current roadmap</h3>
            </div>
          </div>
          <div className="topic-grid">
            {topics.map((topic) => {
              const isCompleted = completedTopics.includes(topic.id)
              return (
                <article key={topic.id} className="topic-card">
                  <div className="topic-badge">{topic.badge}</div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <p className="topic-summary">{topic.summary}</p>
                  <div className="topic-actions">
                    <button type="button" className="button-primary" onClick={() => onSelectTopic(topic.id)}>
                      Explore
                    </button>
                    <span className={`status-pill ${isCompleted ? 'done' : ''}`}>
                      {isCompleted ? 'Completed' : 'In progress'}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <aside className="dashboard-side-panel">
          <div className="side-panel-card">
            <p className="section-label">Next up</p>
            <ul>
              {nextTopics.map((topic) => (
                <li key={topic.id}>{topic.title}</li>
              ))}
            </ul>
          </div>
          <div className="side-panel-card">
            <p className="section-label">Focus mode</p>
            <p>Use the visualizer for a calm, distraction-free walkthrough of today’s concept.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
