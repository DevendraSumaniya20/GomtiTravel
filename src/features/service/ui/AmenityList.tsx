import { useAmenities } from '../api/serviceGateway.ts'
import './AmenityList.css'

export function AmenityList() {
  const amenities = useAmenities()

  return (
    <dl className="amenity-list sheet pane">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="amenity-list__item">
          <dt>{amenity.title}</dt>
          <dd>{amenity.text}</dd>
        </div>
      ))}
    </dl>
  )
}
