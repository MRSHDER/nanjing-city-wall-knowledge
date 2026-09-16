import { useCallback, useEffect, useState } from 'react'
import { knowledgeService } from '@/services/knowledgeService'
import { useExploration } from '@/state/ExplorationContext'
import { KioskButton } from '../common/KioskButton'
import { MissionPanel, type MissionVerdict } from '../missions/MissionPanel'
import { BrickInscriptionCard } from './BrickInscriptionCard'
import { InscriptionQuest } from './InscriptionQuest'
import { LogisticsPath } from './LogisticsPath'
import { NodeImages } from './NodeImages'

const CATEGORY_LABEL: Record<string, string> = {
  'cat-overview': '城墙总览',
  'cat-history': '历史',
  'cat-gate': '城门防御',
  'cat-material': '城砖工艺',
  'cat-heritage': '遗产传承',
}

export function KnowledgeDetail() {
  const { session, closeDetail, finishMission } = useExploration()
  const [verdict, setVerdict] = useState<MissionVerdict>('idle')
  const [showBody, setShowBody] = useState(false)

  useEffect(() => {
    setVerdict('idle')
    setShowBody(false)
  }, [session.selectedNodeId])

  const handleVerdict = useCallback((next: MissionVerdict) => {
    setVerdict(next)
  }, [])

  if (!session.selectedNodeId) return null

  const node = knowledgeService.getNode(session.selectedNodeId)
  const mission = knowledgeService.getMissionByNode(session.selectedNodeId)
  if (!node) return null

  const isInscription = node.id === 'node-inscription'
  const isLogistics = node.id === 'node-ming-logistics'
  const answeredCorrect = verdict === 'correct'
  const alreadyCompleted = Boolean(mission && session.completedMissionIds.includes(mission.id))
  const canContinue = answeredCorrect || mission?.kind === 'read' || alreadyCompleted
  const correctChoice = mission?.choices?.find((choice) => choice.correct)
  const rich = isInscription || isLogistics

  function onContinue() {
    if (canContinue && mission && !alreadyCompleted) {
      finishMission(mission)
    }
    closeDetail()
  }

  return (
    <>
      <button
        type="button"
        className="knowledge-detail__backdrop"
        aria-label="关闭知识详情，返回图谱"
        onClick={closeDetail}
      />

      {showBody ? (
        <aside
          id="node-intro"
          className="knowledge-detail__intro-pane"
          aria-label={`${node.title}答题线索`}
        >
          <div className="knowledge-detail__intro-kicker">答题线索</div>
          {correctChoice ? (
            <div className="knowledge-detail__clue-answer">
              <span>正确答案</span>
              <strong>{correctChoice.id.toUpperCase()} · {correctChoice.label}</strong>
            </div>
          ) : null}
          <p>{node.content}</p>
        </aside>
      ) : null}

      <aside
        className={`knowledge-detail${rich ? ' is-rich' : ''}`}
        aria-label={`${node.title}知识详情`}
      >
        <button
          type="button"
          className="knowledge-detail__close"
          aria-label="关闭知识详情，返回图谱"
          onClick={closeDetail}
        >
          ×
        </button>

        <div className="knowledge-detail__eyebrow">
          知识节点 · {CATEGORY_LABEL[node.categoryId] ?? '南京城墙'}
        </div>
        <div className="knowledge-detail__title-row">
          <h2>{node.title}</h2>
          <button
            type="button"
            className={`intro-toggle${showBody ? ' is-open' : ''}`}
            aria-expanded={showBody}
            aria-controls="node-intro"
            aria-label={showBody ? '收起线索' : '查看线索'}
            onClick={() => setShowBody((open) => !open)}
          >
            <svg className="intro-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
              {showBody ? <path d="M14 6 L8 12 L14 18" /> : <path d="M6 10 L12 16 L18 10" />}
            </svg>
            <span>线索</span>
          </button>
        </div>
        <p className="knowledge-detail__summary">{node.summary}</p>
        <NodeImages key={node.id} imageIds={node.imageIds} />

        {isInscription ? <BrickInscriptionCard /> : null}

        {isLogistics ? <LogisticsPath /> : null}

        {isInscription && mission ? (
          <InscriptionQuest key={mission.id} mission={mission} />
        ) : mission ? (
          <MissionPanel key={mission.id} mission={mission} onVerdictChange={handleVerdict} />
        ) : null}

        {canContinue ? (
          <KioskButton className="knowledge-detail__continue" onClick={onContinue}>
            继续探索
          </KioskButton>
        ) : null}
      </aside>
    </>
  )
}
