import { useCoaches } from '../api/coachesGateway.ts'
import { SeatMap } from './SeatMap.tsx'
import './CoachList.css'

export function CoachList() {
  const coaches = useCoaches()

  return (
    <div className="coach-list">
      {coaches.map((coach) => (
        <article key={coach.id} className="coach-list__coach sheet pane">
          <SeatMap layout={coach.layout} rows={coach.rows} />
          <div>
            <h3>{coach.name}</h3>
            <p className="coach-list__capacity">
              {coach.layout.join(' + ')} layout, {coach.capacity}
            </p>
            <ul className="coach-list__notes">
              {coach.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  )
}
