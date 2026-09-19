import { useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'

type JudgeStatus = 'idle' | 'wrong' | 'correct'

const JUDGE_OPTIONS = [
  {
    id: 'info',
    label: '产地、人名，以及制作与责任信息',
    correct: true,
    explanation: '铭文让一块砖变成了可以追踪的信息载体。',
  },
  {
    id: 'kiln',
    label: '砖窑当时的烧制温度',
    correct: false,
    hint: '铭文记录的不是窑温，而是人和地方。',
  },
  {
    id: 'craft',
    label: '这段城墙的砌筑工序',
    correct: false,
    hint: '铭文留在砖上，讲的是这块砖自己的信息。',
  },
] as const

interface Props {
  mission: Mission
}

export function InscriptionQuest({ mission }: Props) {
  const { session, finishMission } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)
  const [judgeStatus, setJudgeStatus] = useState<JudgeStatus>(done ? 'correct' : 'idle')
  const [judgeId, setJudgeId] = useState<string | null>(done ? 'info' : null)
  const [judgeHint, setJudgeHint] = useState<string | null>(null)
  const [triedJudgeIds, setTriedJudgeIds] = useState<string[]>([])

  function onJudge(optionId: string) {
    if (judgeStatus === 'correct') return
    const option = JUDGE_OPTIONS.find((item) => item.id === optionId)
    if (!option) return

    setJudgeId(option.id)
    if (option.correct) {
      setJudgeStatus('correct')
      setJudgeHint(null)
      finishMission(mission)
      return
    }

    setJudgeStatus('wrong')
    setTriedJudgeIds((prev) => (prev.includes(option.id) ? prev : [...prev, option.id]))
    setJudgeHint(option.hint)
  }

  return (
    <section className="inscription-quest" aria-label="城砖铭文观察题">
      <div className="mission-kicker">观察题</div>
      <h3>从城砖铭文中，我们可能追踪到哪些信息？</h3>
      <div className="mission-choices">
        {JUDGE_OPTIONS.map((option, index) => {
          const isCorrectPick = judgeStatus === 'correct' && option.correct
          const isTriedWrong = triedJudgeIds.includes(option.id)
          const className = [
            'mission-choice',
            judgeId === option.id ? 'selected' : '',
            isCorrectPick ? 'correct' : '',
            isTriedWrong && !option.correct ? 'wrong' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={option.id}
              type="button"
              className={className}
              disabled={judgeStatus === 'correct'}
              onClick={() => onJudge(option.id)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option.label}
            </button>
          )
        })}
      </div>
      {judgeStatus === 'wrong' && judgeHint ? (
        <p className="mission-feedback wrong">
          <strong>× 再看一眼砖文</strong>
          <span>提示：{judgeHint}</span>
        </p>
      ) : null}
      {judgeStatus === 'correct' ? (
        <div className="mission-success">
          <strong>✓ 探索完成</strong>
          <span>{JUDGE_OPTIONS[0].explanation}</span>
        </div>
      ) : null}
    </section>
  )
}
