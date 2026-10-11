import type { Service } from '../model/services.ts'

/** Line drawings on a 24 unit grid, one per kind of service. */
const PATHS: Record<Service['icon'], string> = {
  bus: 'M5 17V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11M5 11h14M4 17h16M8 17v2M16 17v2M8.5 14h.01M15.5 14h.01',
  temple: 'M12 2v3M12 5l3 6H9l3-6ZM7 11h10l1 4H6l1-4ZM5 15h14v6H5v-6ZM10.5 21v-3a1.5 1.5 0 0 1 3 0v3M12 2l3 1-3 1',
  car: 'M4 16v-3l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5v3M3 16h18M6 16v2M18 16v2M5 12h14M7.5 14h.01M16.5 14h.01',
  train: 'M7 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM5 10h14M9 14h.01M15 14h.01M8 17l-2 4M16 17l2 4M9 6h6',
  plane: 'M10.5 13.5 3 11l1-2 8 1 5-5a2 2 0 0 1 3 3l-5 5 1 8-2 1-2.5-7.5ZM10.5 13.5 7 17v3l2-1',
}

type ServiceIconProps = {
  icon: Service['icon']
}

export function ServiceIcon({ icon }: ServiceIconProps) {
  return (
    <svg className="service-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[icon]} />
    </svg>
  )
}
