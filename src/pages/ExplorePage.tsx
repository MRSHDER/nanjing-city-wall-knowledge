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
        <KioskButton onClick={reset}>重新开始</KioskButton>
      </header>

      <KnowledgeMap />

      {session.selectedNodeId ? <KnowledgeDetail /> : null}

      <div style={{ position: 'absolute', left: 32, bottom: 24, zIndex: 4 }}>
        <AchievementList />
      </div>
    </main>
  )
}
