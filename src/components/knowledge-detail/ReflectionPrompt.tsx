import { useEffect, useRef, useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import type { MissionVerdict } from '../missions/MissionPanel'
import './reflection-prompt.css'

interface Props {
  mission: Mission
  onVerdictChange?: (verdict: MissionVerdict) => void
}

/**
 * 收束节点的开放思考：不设选项、没有对错，只提供一段参考思考。
 * 展开后发出既有的“本题已完成”信号（verdict = correct），
 * 后续的「继续探索 / 完成统计 / 结算总结」沿用原有链路，不改动任何流程逻辑。
 */
export function ReflectionPrompt({ mission, onVerdictChange }: Props) {
  const { session } = useExploration()
  const reflection = mission.reflection
  const done = session.completedMissionIds.includes(mission.id)
  const [revealed, setRevealed] = useState(done)
  const answerRef = useRef<HTMLDivElement>(null)

  // 参考内容在按钮下方，展开后滚进来，避免点了像没反应
  useEffect(() => {
    if (revealed) answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [revealed])

  if (!reflection) return null

  function onReveal() {
    if (revealed) return
    setRevealed(true)
    onVerdictChange?.('correct')
  }

  return (
    <section className="mission-panel reflection-prompt" aria-label="开放思考">
      <div className="mission-kicker">探索任务</div>
      <h3>{mission.title}</h3>
      {mission.brief ? <p className="mission-brief">{mission.brief}</p> : null}
      <p className="reflection-prompt__question">{mission.prompt}</p>
      <p className="reflection-prompt__invitation">{reflection.invitation}</p>

      {revealed ? (
        <div
          ref={answerRef}
          className="mission-success reflection-prompt__answer"
          role="status"
          aria-live="polite"
        >
          {reflection.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <strong>{reflection.doneLabel ?? '✓ 探索完成'}</strong>
        </div>
      ) : (
        <button type="button" className="reflection-prompt__action" onClick={onReveal}>
          {reflection.actionLabel ?? '查看参考思考'}
        </button>
      )}
    </section>
  )
}
