import { useExploration } from '@/state/ExplorationContext'

export function TimelineRail() {
  const { catalog } = useExploration()

  return (
    <ol style={{ display: 'flex', gap: 24, listStyle: 'none', padding: 0 }}>
      {catalog.periods.map((period) => (
        <li key={period.id}>{period.name}</li>
      ))}
    </ol>
  )
}
