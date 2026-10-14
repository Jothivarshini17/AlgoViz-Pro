export default function AlgorithmControls({
  onRun,
  onReset,
  onPrevious,
  onNext,
  running,
  canGoBack,
  canGoForward,
}) {
  return (
    <div className="controls-row">
      <button type="button" className="button-primary" onClick={onRun} disabled={running}>
        {running ? 'Running...' : 'Run Algorithm'}
      </button>
      <button type="button" className="button-secondary" onClick={onPrevious} disabled={!canGoBack}>
        Previous
      </button>
      <button type="button" className="button-secondary" onClick={onNext} disabled={!canGoForward}>
        Next
      </button>
      <button type="button" className="button-secondary" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}
