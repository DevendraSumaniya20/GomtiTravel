import { localStore } from '../../../shared/lib/localStore.ts'
import { useStore } from '../../../shared/lib/useStore.ts'
import { AMENITIES, BOARDING_POINTS, type Amenity, type BoardingPoint } from '../model/service.ts'

export const amenitiesStore = localStore<readonly Amenity[]>('gomti.v2.amenities', AMENITIES)
export const boardingStore = localStore<readonly BoardingPoint[]>('gomti.v2.boarding', BOARDING_POINTS)

export const useAmenities = () => useStore(amenitiesStore)
export const useBoardingPoints = () => useStore(boardingStore)
