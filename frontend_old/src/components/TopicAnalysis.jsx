export default function TopicAnalysis({ topic, onComplete }) {
  if (!topic) return null

  return (
    <section className="analysis-card">
      <div className="panel-intro">
        <div>
          <p className="section-label">Analysis</p>
          <h2>{topic.title}</h2>
        </div>
        <button type="button" className="button-primary" onClick={() => onComplete(topic.id)}>
          Mark as completed
        </button>
      </div>

      <div className="analysis-grid">
        <div className="insight-card">
          <h3>What you will learn</h3>
          <p>{topic.summary}</p>
        </div>
        <div className="insight-card">
          <h3>Why it matters</h3>
          <p>{topic.description}</p>
        </div>
      </div>

      <div className="analysis-list">
        <h3>Included algorithms</h3>
        <ul>
          {topic.algorithms.map((algorithm) => (
            <li key={algorithm}>{algorithm.replace(/-/g, ' ')}</li>
          ))}
        </ul>
      </div>

      <div className="analysis-footer">
        <div className="insight-card">
          <h3>Suggested next step</h3>
          <p>Open the visualizer and experiment with a live example to connect theory with motion.</p>
        </div>
      </div>
    </section>
  )
}
