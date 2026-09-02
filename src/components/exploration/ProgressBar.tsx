import { useExploration } from '@/state/ExplorationContext'

export function ProgressBar() {
  const { progress } = useExploration()
  const width = `${Math.round(progress.percent * 100)}%`

  return (
    <div className="progress-bar" aria-label={`探索进度 ${Math.round(progress.percent * 100)}%`}>
      <div>
        探索进度 {progress.completedNodeCount}/{progress.totalNodeCount} · 探索值 {progress.exploreValue}
      </div>
      <div
        style={{
          height: 12,
          marginTop: 8,
          overflow: 'hidden',
          borderRadius: 999,
          background: 'var(--color-locked)',
        }}
      >
        <div
          style={{
            height: '100%',
            width,
            background: 'var(--color-available)',
            transition: 'width 220ms ease-out',
          }}
        />
      </div>
    </div>
  )
}
