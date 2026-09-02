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
    <main>
      <header style={{ display: 'flex', gap: 24, padding: 16, alignItems: 'center' }}>
        <ProgressBar />
        <TimelineRail />
        <KioskButton onClick={reset}>重新开始</KioskButton>
      </header>
      <KnowledgeMap />
      {session.selectedNodeId ? <KnowledgeDetail /> : null}
      <footer style={{ padding: 16 }}>
        <AchievementList />
      </footer>
    </main>
  )
}
