import { localStore } from '../../../shared/lib/localStore.ts'
import { useStore } from '../../../shared/lib/useStore.ts'
import { COACHES, type Coach } from '../model/coaches.ts'

export const coachesStore = localStore<readonly Coach[]>('gomti.v2.coaches', COACHES)

export const useCoaches = () => useStore(coachesStore)
