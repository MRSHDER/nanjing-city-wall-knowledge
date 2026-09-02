import { AchievementList } from '@/components/achievements/AchievementList'
import { KioskButton } from '@/components/common/KioskButton'
import { ProgressBar } from '@/components/exploration/ProgressBar'
import { KnowledgeDetail } from '@/components/knowledge-detail/KnowledgeDetail'
import { KnowledgeMap } from '@/components/knowledge-map/KnowledgeMap'
import { TimelineRail } from '@/components/timeline/TimelineRail'
import { useExploration } from '@/state/ExplorationContext'

export function ExplorePage() {
  const { session, reset } = useExploration()

  return (
    <main className="explore-page">
      <header className="explore-header">
        <ProgressBar />
        <TimelineRail />
        <KioskButton className="reset-btn" onClick={reset}>
          重新开始
        </KioskButton>
      </header>

      <KnowledgeMap />

      {session.selectedNodeId ? <KnowledgeDetail /> : null}

      <AchievementList />

      <ul className="map-legend" aria-label="节点状态说明">
        <li>
          <i className="is-locked" />
          未解锁
        </li>
        <li>
          <i className="is-available" />
          可探索
        </li>
        <li>
          <i className="is-discovered" />
          已发现
        </li>
        <li>
          <i className="is-completed" />
          已完成
        </li>
      </ul>
    </main>
  )
}
