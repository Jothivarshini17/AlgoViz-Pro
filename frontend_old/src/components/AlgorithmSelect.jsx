import { algorithms } from '../data/algorithms'

export default function AlgorithmSelect({ selected, onChange }) {
  return (
    <div className="control-group">
      <label htmlFor="algorithm-select">Algorithm</label>
      <select id="algorithm-select" value={selected} onChange={(e) => onChange(e.target.value)}>
        {algorithms.map((algorithm) => (
          <option key={algorithm.id} value={algorithm.id}>
            {algorithm.name}
          </option>
        ))}
      </select>
    </div>
  )
}
