import { seatRows, type Coach } from '../model/coaches.ts'
import './SeatMap.css'

type SeatMapProps = {
  layout: Coach['layout']
  rows: number
}

/** Top-down sketch of the first rows of a coach. Decorative: the layout is also stated in text beside it. */
export function SeatMap({ layout, rows }: SeatMapProps) {
  return (
    <div className="seat-map" aria-hidden="true">
      {seatRows(layout, rows).map((row) => (
        <div key={row.number} className="seat-map__row">
          <div className="seat-map__side">
            {row.left.map((seat) => (
              <i key={seat} />
            ))}
          </div>
          <div className="seat-map__side">
            {row.right.map((seat) => (
              <i key={seat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
