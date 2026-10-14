export default function VisualizationPanel({ step, algorithmId, target }) {
  if (!step) {
    return <div className="visual-panel empty">Run an algorithm to visualize the steps.</div>
  }

  const isBinarySearch = algorithmId === 'binary-search'

  return (
    <div className="visual-panel">
      <div className="visual-toolbar">
        <div className="legend">
          <span className="legend-item">
            <span className="dot neutral" /> Normal
          </span>
          <span className="legend-item">
            <span className="dot active" /> Compared
          </span>
          <span className="legend-item">
            <span className="dot range" /> Search range
          </span>
          <span className="legend-item">
            <span className="dot mid" /> Midpoint
          </span>
        </div>
        {isBinarySearch && target != null && <div className="target-pill">Target: {target}</div>}
      </div>

      <div className="visual-row">
        {step.array.map((value, index) => {
          const isCompared = step.compare?.includes(index)
          const isRange =
            isBinarySearch && Array.isArray(step.range)
              ? index >= step.range[0] && index <= step.range[1]
              : false
          const isMid = isBinarySearch && step.mid === index
          const isFound = isBinarySearch && step.found && step.mid === index

          let className = 'bar'
          if (isFound) className += ' found'
          else if (isMid) className += ' mid'
          else if (isCompared) className += ' active'
          else if (isRange) className += ' range'

          return (
            <div key={index} className={className} style={{ height: `${Math.max(42, value * 12)}px` }}>
              <span>{value}</span>
            </div>
          )
        })}
      </div>
      <div className="step-description">
        <strong>{step.description}</strong>
        {isBinarySearch && Array.isArray(step.range) && (
          <div className="meta-line">Active range: [{step.range[0]}, {step.range[1]}]</div>
        )}
      </div>
    </div>
  )
}
