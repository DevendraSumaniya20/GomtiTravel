import { useBoardingPoints } from '../api/serviceGateway.ts'
import { BOOKING_STEPS } from '../model/service.ts'
import './BoardingGuide.css'

/** Pickup points in the order the bus reaches them, beside the three steps of booking. */
export function BoardingGuide() {
  const points = useBoardingPoints()

  return (
    <div className="boarding-guide">
      <ol className="boarding-guide__points sheet pane">
        {points.map((point) => (
          <li key={point.id}>
            <strong>{point.place}</strong>
            <span>{point.pickup}</span>
          </li>
        ))}
      </ol>
      <div className="sheet pane">
        <h3>How booking works</h3>
        <ol className="boarding-guide__steps">
          {BOOKING_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
