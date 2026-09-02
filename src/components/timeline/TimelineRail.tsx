import { useExploration } from '@/state/ExplorationContext'

export function TimelineRail() {
  const { catalog } = useExploration()

  return (
    <ol className="timeline-rail" aria-label="历史时期">
      {catalog.periods.map((period, index) => (
        <li key={period.id}>
          {index > 0 ? <span className="timeline-rail__line" /> : null}
          <i />
          {period.name}
        </li>
      ))}
    </ol>
  )
}
