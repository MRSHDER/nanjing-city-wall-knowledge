import { useExploration } from '@/state/ExplorationContext'

export function ProgressBar() {
  const { progress } = useExploration()

  return (
    <div className="progress-bar" aria-label={`已发现 ${progress.completedNodeCount} 个知识节点`}>
      <div className="progress-bar__title">探索城墙</div>
      <div className="progress-bar__count">
        <b>
          {progress.completedNodeCount} / {progress.totalNodeCount}
        </b>
        <span>已发现知识节点</span>
      </div>
    </div>
  )
}
