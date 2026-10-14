export default function ArrayInput({ value, onChange }) {
  return (
    <div className="control-group">
      <label htmlFor="array-input">Array values</label>
      <input
        id="array-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. 8, 3, 5, 1"
      />
      <p className="hint">Separate values with commas</p>
    </div>
  )
}
