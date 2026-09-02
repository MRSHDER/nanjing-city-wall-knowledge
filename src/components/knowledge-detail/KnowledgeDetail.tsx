import { knowledgeService } from '@/services/knowledgeService'
import { useExploration } from '@/state/ExplorationContext'
import { KioskButton } from '../common/KioskButton'
import { MissionPanel } from '../missions/MissionPanel'
import { BrickInscriptionCard } from './BrickInscriptionCard'
import { InscriptionQuest } from './InscriptionQuest'
import { LogisticsPath } from './LogisticsPath'

const CATEGORY_LABEL: Record<string, string> = {
  'cat-overview': '城墙总览',
  'cat-history': '历史',
  'cat-gate': '城门防御',
  'cat-material': '城砖工艺',
  'cat-heritage': '遗产传承',
}

export function KnowledgeDetail() {
  const { session, closeDetail } = useExploration()
  if (!session.selectedNodeId) return null

  const node = knowledgeService.getNode(session.selectedNodeId)
  const mission = knowledgeService.getMissionByNode(session.selectedNodeId)
  if (!node) return null

  const isInscription = node.id === 'node-inscription'
  const isLogistics = node.id === 'node-ming-logistics'

  return (
    <aside className="knowledge-detail" aria-label={`${node.title}知识详情`}>
      <div className="knowledge-detail__eyebrow">
        知识节点 · {CATEGORY_LABEL[node.categoryId] ?? '南京城墙'}
      </div>
      <h2>{node.title}</h2>
      <p className="knowledge-detail__summary">{node.summary}</p>
      <div className="knowledge-detail__body">
        <p>{node.content}</p>
      </div>

      {isInscription ? (
        <BrickInscriptionCard
          onTrace={() =>
            document.querySelector('.inscription-quest')?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        />
      ) : null}

      {isLogistics ? <LogisticsPath /> : null}

      {isInscription && mission ? (
        <InscriptionQuest mission={mission} />
      ) : mission ? (
        <MissionPanel mission={mission} />
      ) : null}
      <KioskButton onClick={closeDetail}>返回图谱</KioskButton>
    </aside>
  )
}
