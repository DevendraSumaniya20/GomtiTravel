import './Bus.css'

const WHEEL_CENTRES = [60, 198]
const PILLARS = [48, 78, 108, 138, 168]

/**
 * Side view of a coach, facing right. The body is the left 256 of the 320 wide drawing; the rest is headlight beam.
 * It shows the driver's side, which on an Indian coach has no passenger door.
 */
export function Bus() {
  return (
    <svg className="bus" viewBox="0 0 320 104" aria-hidden="true">
      <defs>
        <linearGradient id="bus-beam" x1="0" x2="1">
          <stop className="bus__beam-near" offset="0" />
          <stop className="bus__beam-far" offset="1" />
        </linearGradient>
      </defs>
      <ellipse className="bus__shadow" cx="131" cy="99" rx="128" ry="4" />
      <path className="bus__beam" d="M254 68 320 50V100L254 78Z" fill="url(#bus-beam)" />
      <g className="bus__chassis">
        <rect className="bus__roof" x="64" y="5" width="96" height="9" rx="4" />
        <path className="bus__body" d="M14 12h196c22 0 40 22 46 46v24a6 6 0 0 1-6 6H14a8 8 0 0 1-8-8V20a8 8 0 0 1 8-8Z" />
        <path className="bus__skirt" d="M6 58h250v24a6 6 0 0 1-6 6H14a8 8 0 0 1-8-8Z" />
        <path className="bus__stripe" d="M6 52C80 36 130 74 256 54v8C130 82 80 46 6 62Z" />
        <path className="bus__glass" d="M18 22h178v24H18zM204 22h8c14 0 28 12 36 26h-44Z" />
        <path className="bus__pillars" d={PILLARS.map((x) => `M${x} 22v24`).join('')} />
        <path className="bus__mirror" d="M246 40l10-4v12" />
        <text className="bus__name" x="129" y="82" textAnchor="middle">
          GOMTI TRAVELS
        </text>
        <rect className="bus__lamp" x="247" y="68" width="8" height="8" rx="3" />
        <rect className="bus__brake" x="6" y="62" width="4" height="11" rx="2" />
        {WHEEL_CENTRES.map((cx) => (
          <path key={cx} className="bus__arch" d={`M${cx - 18} 88a18 18 0 0 1 36 0Z`} />
        ))}
      </g>
      {WHEEL_CENTRES.map((cx) => (
        <g key={cx} className="bus__wheel">
          <circle className="bus__tyre" cx={cx} cy="86" r="13" />
          <circle className="bus__hub" cx={cx} cy="86" r="6" />
          <path className="bus__spoke" d={`M${cx - 13} 86h26M${cx} 73v26`} />
        </g>
      ))}
    </svg>
  )
}
