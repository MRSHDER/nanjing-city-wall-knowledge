import { useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import { KioskButton } from '../common/KioskButton'

interface Props {
  mission: Mission
}

export function MissionPanel({ mission }: Props) {
  const { session, finishMission } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  function submitChoice() {
    const choice = mission.choices?.find((item) => item.id === selectedChoiceId)
    if (!choice) return

    if (choice.correct) {
      setFeedback('correct')
      finishMission(mission)
    } else {
      setFeedback('wrong')
    }
  }

  return (
    <section className="mission-panel" aria-label="探索任务">
      <div className="mission-kicker">探索任务</div>
      <h3>{mission.title}</h3>
      <p>{mission.prompt}</p>

      {done ? (
        <div className="mission-success">
          <strong>探索完成</strong>
          <span>已获得 {mission.exploreValue} 点探索值，新的知识节点已解锁。</span>
        </div>
      ) : mission.kind === 'choose' ? (
        <>
          <div className="mission-choices">
            {mission.choices?.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className={selectedChoiceId === choice.id ? 'mission-choice selected' : 'mission-choice'}
                onClick={() => {
                  setSelectedChoiceId(choice.id)
                  setFeedback(null)
                }}
              >
                <span>{choice.id.toUpperCase()}</span>
                {choice.label}
              </button>
            ))}
          </div>
          {feedback === 'wrong' ? (
            <p className="mission-feedback wrong">再想想。线索就在上面的知识介绍里。</p>
          ) : null}
          {feedback === 'correct' ? (
            <p className="mission-feedback correct">回答正确，正在展开新的知识路径。</p>
          ) : null}
          <KioskButton disabled={!selectedChoiceId} onClick={submitChoice}>
            确认答案
          </KioskButton>
        </>
      ) : (
        <KioskButton onClick={() => finishMission(mission)}>我已阅读，继续探索</KioskButton>
      )}
    </section>
  )
}
