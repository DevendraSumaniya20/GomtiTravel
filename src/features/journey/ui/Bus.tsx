import { useId } from 'react'
import './Bus.css'

const WHEEL_CENTRES = [150, 222, 650]
const PILLARS = [136, 210, 284, 358, 432, 506, 580]
const SHINES = [86, 308, 530]
/** Five wheel nuts on a 12 unit circle. */
const NUTS = Array.from({ length: 5 }, (_, index) => {
  const angle = (index * 2 * Math.PI) / 5
  return [Math.round(Math.sin(angle) * 120) / 10, Math.round(-Math.cos(angle) * 120) / 10] as const
})

/**
 * Side view of a multi-axle sleeper coach, facing right. The body is the left 786 of the 1000 wide drawing;
 * the rest is headlight beam. It shows the driver's side, which on an Indian coach has no passenger door.
 */
export function Bus() {
  // Two buses can be on the page, so the gradient ids must not clash.
  const id = useId()
  const fill = (name: string) => `url(#${id}${name})`

  return (
    <svg className="bus" viewBox="0 0 1000 250" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}beam`} x1="0" x2="1">
          <stop className="bus__beam-near" offset="0" />
          <stop className="bus__beam-far" offset="1" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="0" y1="0" x2="0" y2="1">
          <stop className="bus__body-top" offset="0" />
          <stop className="bus__body-bottom" offset="1" />
        </linearGradient>
        <linearGradient id={`${id}glass`} x1="0" y1="0" x2="0" y2="1">
          <stop className="bus__glass-top" offset="0" />
          <stop className="bus__glass-bottom" offset="1" />
        </linearGradient>
        <radialGradient id={`${id}rim`}>
          <stop className="bus__rim-light" offset="0.35" />
          <stop className="bus__rim-dark" offset="1" />
        </radialGradient>
      </defs>
      <ellipse className="bus__shadow" cx="405" cy="237" rx="392" ry="9" />
      <path className="bus__beam" d="M782 170 1000 128V240L782 190Z" fill={fill('beam')} />
      <g className="bus__chassis">
        <path className="bus__dark" d="M250 42v-12a9 9 0 0 1 9-9h212a9 9 0 0 1 9 9v12ZM520 42v-6a6 6 0 0 1 6-6h58a6 6 0 0 1 6 6v6Z" />
        <path d="M48 40H676Q742 42 772 108L786 150V196Q786 206 776 206H46Q30 206 30 190V58Q30 40 48 40Z" fill={fill('body')} />
        <path className="bus__livery" d="M30 172C190 150 330 206 520 176S720 150 786 152V196Q786 206 776 206H46Q30 206 30 190Z" />
        <path className="bus__stripe" d="M30 165C190 143 330 199 520 169S720 143 785 145" />
        <path d="M68 54H652V90H68ZM68 98H652V134H68ZM664 54H690Q736 58 764 112L776 146H664Z" fill={fill('glass')} />
        <path className="bus__pillars" d={PILLARS.map((x) => `M${x} 54V134`).join('')} />
        <path
          className="bus__shine"
          d={`${SHINES.map((x) => `M${x} 54l-14 36h16l14-36ZM${x + 40} 98l-14 36h10l14-36Z`).join('')}M704 58l-26 86h18l30-80Z`}
        />
        <text className="bus__name" x="360" y="159" textAnchor="middle">
          GOMTI TRAVELS
        </text>
        <path className="bus__bays" d="M300 188h112v15H300ZM424 188h112v15H424Z" />
        <path className="bus__dark" d="M46 203h730v6H46ZM742 198h40a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6h-40ZM26 204a6 6 0 0 1 6-6h24v14H32a6 6 0 0 1-6-6Z" />
        <path className="bus__lamp" d="M768 158q16 2 18 16v8h-18Z" />
        <rect className="bus__stripe-fill" x="776" y="187" width="9" height="6" rx="2" />
        <rect className="bus__brake" x="30" y="148" width="7" height="28" rx="3" />
        <path className="bus__mirror" d="M760 96q28-4 32 28" />
        <rect className="bus__dark" x="786" y="120" width="11" height="30" rx="4" />
        {WHEEL_CENTRES.map((cx) => (
          <path key={cx} className="bus__dark" d={`M${cx - 38} 206a38 38 0 0 1 76 0Z`} />
        ))}
      </g>
      {WHEEL_CENTRES.map((cx) => (
        <g key={cx} className="bus__wheel">
          <circle className="bus__dark" cx={cx} cy="204" r="31" />
          <circle cx={cx} cy="204" r="20" fill={fill('rim')} />
          <circle className="bus__dark" cx={cx} cy="204" r="6" />
          {NUTS.map(([dx, dy]) => (
            <circle key={`${dx},${dy}`} className="bus__dark" cx={cx + dx} cy={204 + dy} r="2.6" />
          ))}
        </g>
      ))}
    </svg>
  )
}
