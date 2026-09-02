import { useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import { KioskButton } from '../common/KioskButton'

type ChoiceStatus = 'idle' | 'wrong' | 'correct'

interface Props {
  mission: Mission
}

export function MissionPanel({ mission }: Props) {
  const { session, finishMission } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)
  const [status, setStatus] = useState<ChoiceStatus>('idle')
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null)
  const [triedWrongIds, setTriedWrongIds] = useState<string[]>([])
  const [hint, setHint] = useState<string | null>(null)

  function onPickChoice(choiceId: string) {
    if (status === 'correct' || done) return

    const choice = mission.choices?.find((item) => item.id === choiceId)
    if (!choice) return

    setSelectedChoiceId(choice.id)

    if (choice.correct) {
      setStatus('correct')
      setHint(null)
      return
    }

    setStatus('wrong')
    setTriedWrongIds((prev) => (prev.includes(choice.id) ? prev : [...prev, choice.id]))
    setHint(choice.hint ?? '再观察一下上面的介绍，线索就在知识正文里。')
  }

  function continueAfterCorrect() {
    if (!done) finishMission(mission)
  }

  const locked = status === 'correct' || done

  return (
    <section className="mission-panel" aria-label="探索任务">
      <div className="mission-kicker">探索任务</div>
      <h3>{mission.title}</h3>
      <p>{mission.prompt}</p>

      {done && status === 'idle' ? (
        <div className="mission-success">
          <strong>探索完成</strong>
          <span>
            已获得 {mission.exploreValue} 点探索值，新的知识节点已解锁。
            {mission.explanation ? ` ${mission.explanation}` : ''}
          </span>
        </div>
      ) : mission.kind === 'choose' ? (
        <>
          <div className="mission-choices">
            {mission.choices?.map((choice) => {
              const isCorrectPick = locked && choice.correct
              const isTriedWrong = triedWrongIds.includes(choice.id)
              const isSelected = selectedChoiceId === choice.id
              const className = [
                'mission-choice',
                isSelected ? 'selected' : '',
                isCorrectPick ? 'correct' : '',
                isTriedWrong && !isCorrectPick ? 'wrong' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={choice.id}
                  type="button"
                  className={className}
                  disabled={locked}
                  onClick={() => onPickChoice(choice.id)}
                >
                  <span>{choice.id.toUpperCase()}</span>
                  {choice.label}
                </button>
              )
            })}
          </div>

          {status === 'wrong' && hint ? (
            <p className="mission-feedback wrong">
              <strong>× 还不是</strong>
              <span>提示：{hint}</span>
            </p>
          ) : null}

          {status === 'correct' ? (
            <>
              <p className="mission-feedback correct">
                <strong>✓ 判断正确</strong>
                <span>
                  {mission.explanation ?? '你找到了这条知识线索，可以继续向前探索。'}
                </span>
              </p>
              {done ? (
                <div className="mission-success">
                  <strong>探索完成</strong>
                  <span>已获得 {mission.exploreValue} 点探索值，新的知识节点已解锁。</span>
                </div>
              ) : (
                <KioskButton onClick={continueAfterCorrect}>继续探索 →</KioskButton>
              )}
            </>
          ) : null}
        </>
      ) : (
        <KioskButton onClick={() => finishMission(mission)}>我已阅读，继续探索</KioskButton>
      )}
    </section>
  )
}
