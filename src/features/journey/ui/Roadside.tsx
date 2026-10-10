import './Roadside.css'

/** Wind turbines, as they stand along the coast road out of Dwarka: [x, mast height, blade angle]. */
const TURBINES = [
  [1010, 150, 10],
  [1240, 118, 50],
  [1500, 164, 85],
  [1860, 132, 30],
  [2160, 156, 70],
] as const

const TREES = [120, 500, 880, 1680, 2320]

/** What the bus passes on the way out of Dwarka: the temple spire with its flag, the lighthouse, then turbines. */
export function Roadside() {
  return (
    <svg className="roadside" viewBox="0 0 2400 200">
      {TREES.map((x) => (
        <path key={x} d={`M${x - 3} 200v-34h6v34ZM${x - 34} 168q34-30 68 0Z`} />
      ))}
      <path d="M196 200v-52h128v52ZM226 148l12-42h6l10-52h6l10 52h6l12 42ZM176 200v-30l14-30 14 30v30ZM316 200v-30l14-30 14 30v30Z" />
      <path className="roadside__flag" d="M256 54V20h2v2l24 7-24 7v18Z" />
      <path d="M688 200l7-112h22l7 112ZM692 88v-16h28v16ZM696 72l10-14 10 14Z" />
      {TURBINES.map(([x, height, angle]) => (
        <g key={x}>
          <path d={`M${x - 3} 200l2-${height}h2l2 ${height}Z`} />
          <path
            className="roadside__blades"
            d="M0 0V-52M0 0l45 26M0 0l-45 26"
            transform={`translate(${x} ${200 - height}) rotate(${angle})`}
          />
        </g>
      ))}
    </svg>
  )
}
