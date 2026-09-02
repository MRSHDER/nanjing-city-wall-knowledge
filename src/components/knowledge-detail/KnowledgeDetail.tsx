import { knowledgeService } from '@/services/knowledgeService'
import { useExploration } from '@/state/ExplorationContext'
import { KioskButton } from '../common/KioskButton'
import { MissionPanel } from '../missions/MissionPanel'

export function KnowledgeDetail() {
  const { session, closeDetail } = useExploration()
  if (!session.selectedNodeId) return null

  const node = knowledgeService.getNode(session.selectedNodeId)
  const mission = knowledgeService.getMissionByNode(session.selectedNodeId)
  if (!node) return null

  return (
    <aside className="knowledge-detail" style={{ padding: 24 }}>
      <h2>{node.title}</h2>
      <p>{node.summary}</p>
      <p>{node.content}</p>
      {mission ? <MissionPanel mission={mission} /> : null}
      <KioskButton onClick={closeDetail}>返回图谱</KioskButton>
    </aside>
  )
}
