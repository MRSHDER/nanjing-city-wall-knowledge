import { useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'

type JudgeStatus = 'idle' | 'wrong' | 'correct'

const JUDGE_OPTIONS = [
  {
    id: 'responsibility',
    label: '追溯生产责任',
    correct: true,
    explanation: '这些名字把造砖、烧造和管理责任留在砖上。',
  },
  {
    id: 'decoration',
    label: '装饰砖面',
    correct: false,
    hint: '这些文字不是装饰，重点是“谁负责”。',
  },
  {
    id: 'guide',
    label: '给游客指路',
    correct: false,
    hint: '它们不是路线标识，而是明代工程留下的责任信息。',
  },
] as const

interface Props {
  mission: Mission
}

export function InscriptionQuest({ mission }: Props) {
  const { session, finishMission } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)
  const [judgeStatus, setJudgeStatus] = useState<JudgeStatus>(done ? 'correct' : 'idle')
  const [judgeId, setJudgeId] = useState<string | null>(done ? 'responsibility' : null)
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
      <h3>砖面上这些名字主要为了什么？</h3>
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
          <span>{JUDGE_OPTIONS[0].explanation} 可以返回图谱继续探索。</span>
        </div>
      ) : null}
    </section>
  )
}
