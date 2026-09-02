import { useExploration } from '@/state/ExplorationContext'

export function ProgressBar() {
  const { progress } = useExploration()
  const width = `${Math.round(progress.percent * 100)}%`

  return (
    <div>
      <div>
        探索进度 {progress.completedNodeCount}/{progress.totalNodeCount} · 探索值{' '}
        {progress.exploreValue}
      </div>
      <div style={{ height: 16, background: '#4a4338' }}>
        <div style={{ height: '100%', width, background: '#d4a017' }} />
      </div>
    </div>
  )
}
