import { useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import { KioskButton } from '../common/KioskButton'

const ROLES = [
  {
    id: 'jiaoshou',
    name: '甲首',
    duty: '基层组织负责人，向上对接总甲，向下联络小甲与人夫',
    hint: '“甲首”并不是具体烧砖的窑匠，也不是只管运砖的人。再看看铭文里的身份顺序。',
  },
  {
    id: 'yaojiang',
    name: '窑匠',
    duty: '掌握烧造工艺，对入窑成砖的质量负责',
    hint: '窑匠才是负责烧制城砖的角色。',
  },
  {
    id: 'renfu',
    name: '造砖人夫',
    duty: '直接参与制坯、运泥等劳作',
    hint: '造砖人夫是直接动手制砖的人，不是基层组织负责人。',
  },
] as const

const DUTY_OPTIONS = ROLES.map((role) => role.duty)

const JUDGE_OPTIONS = [
  {
    id: 'jiaoshou',
    label: '基层组织里的负责人',
    correct: true,
    explanation: '“甲首”属于责任体系中的管理角色，与具体负责烧制城砖的窑匠不同。',
  },
  {
    id: 'transport',
    label: '负责运输城砖',
    correct: false,
    hint: '可以再看看铭文中的身份关系。“甲首”并不是具体运砖或烧砖的人。',
  },
  {
    id: 'yaojiang',
    label: '负责烧制城砖',
    correct: false,
    hint: '窑匠才是负责烧制城砖的角色。再看看铭文中的身份关系。',
  },
] as const

type JudgeStatus = 'idle' | 'wrong' | 'correct'

interface Props {
  mission: Mission
}

export function InscriptionQuest({ mission }: Props) {
  const { session, finishMission } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)
  const [step, setStep] = useState<'observe' | 'judge' | 'match' | 'conclude'>(
    done ? 'conclude' : 'observe',
  )
  const [judgeStatus, setJudgeStatus] = useState<JudgeStatus>('idle')
  const [judgeId, setJudgeId] = useState<string | null>(null)
  const [judgeHint, setJudgeHint] = useState<string | null>(null)
  const [triedJudgeIds, setTriedJudgeIds] = useState<string[]>([])
  const [picks, setPicks] = useState<Record<string, string>>({})
  const [rowHints, setRowHints] = useState<Record<string, string>>({})
  const [matchLocked, setMatchLocked] = useState(false)

  function onJudge(optionId: string) {
    if (judgeStatus === 'correct') return
    const option = JUDGE_OPTIONS.find((item) => item.id === optionId)
    if (!option) return

    setJudgeId(option.id)
    if (option.correct) {
      setJudgeStatus('correct')
      setJudgeHint(null)
      return
    }

    setJudgeStatus('wrong')
    setTriedJudgeIds((prev) => (prev.includes(option.id) ? prev : [...prev, option.id]))
    setJudgeHint(option.hint)
  }

  function onPickDuty(roleId: string, duty: string) {
    if (matchLocked) return
    const role = ROLES.find((item) => item.id === roleId)
    if (!role) return

    const nextPicks = { ...picks, [roleId]: duty }
    setPicks(nextPicks)

    if (duty !== role.duty) {
      setRowHints((prev) => ({ ...prev, [roleId]: role.hint }))
      return
    }

    setRowHints((prev) => {
      const next = { ...prev }
      delete next[roleId]
      return next
    })

    const allCorrect = ROLES.every((item) => nextPicks[item.id] === item.duty)
    if (allCorrect) setMatchLocked(true)
  }

  function finishQuest() {
    if (!done) finishMission(mission)
    setStep('conclude')
  }

  if (done || step === 'conclude') {
    return (
      <section className="inscription-quest" aria-label="铭文探索结论">
        <div className="mission-kicker">结论</div>
        <h3>这块砖把责任留下来了</h3>
        <p>
          「甲首刘德華」「窑匠晏文叁」「造磚人夫刘德華」不是装饰文字。甲首属于基层组织，窑匠负责烧造，造砖人夫直接制砖。同一人可以同时出现在甲首和人夫位置上，说明基层责任常常叠在同一个人身上。
        </p>
        <div className="mission-success">
          <strong>第一关完成</strong>
          <span>{mission.explanation} 责任链已经点亮，可以继续追问：砖从哪里来。</span>
        </div>
      </section>
    )
  }

  if (step === 'observe') {
    return (
      <section className="inscription-quest" aria-label="观察铭文">
        <div className="mission-kicker">第一步 · 观察</div>
        <h3>先看清砖上到底写了谁</h3>
        <p>不要急着答题。先把「甲首」「窑匠」「造砖人夫」三个身份认下来。</p>
        <KioskButton onClick={() => setStep('judge')}>我看清了这些人名</KioskButton>
      </section>
    )
  }

  if (step === 'judge') {
    return (
      <section className="inscription-quest" aria-label="判断身份">
        <div className="mission-kicker">第二步 · 判断</div>
        <h3>「甲首」在城砖责任体系中承担什么角色？</h3>
        <div className="mission-choices">
          {JUDGE_OPTIONS.map((option) => {
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
                {option.label}
              </button>
            )
          })}
        </div>
        {judgeStatus === 'wrong' && judgeHint ? (
          <p className="mission-feedback wrong">
            <strong>× 还不是</strong>
            <span>提示：{judgeHint}</span>
          </p>
        ) : null}
        {judgeStatus === 'correct' ? (
          <>
            <p className="mission-feedback correct">
              <strong>✓ 判断正确</strong>
              <span>你找到了这块城砖留下的责任线索。{JUDGE_OPTIONS[0].explanation}</span>
            </p>
            <KioskButton onClick={() => setStep('match')}>继续探索 →</KioskButton>
          </>
        ) : null}
      </section>
    )
  }

  return (
    <section className="inscription-quest" aria-label="匹配职责">
      <div className="mission-kicker">第三步 · 推理</div>
      <h3>把三种身份和职责对上</h3>
      <p>点选每一行的职责。点错会立刻提示，三行都对上后再继续。</p>
      <div className="role-match">
        {ROLES.map((role) => {
          const picked = picks[role.id]
          const rowCorrect = picked === role.duty
          return (
            <div key={role.id} className="role-match__row">
              <strong>{role.name}</strong>
              <div className="role-match__duties">
                {DUTY_OPTIONS.map((duty) => {
                  const selected = picked === duty
                  const className = [
                    'mission-choice',
                    selected ? 'selected' : '',
                    selected && rowCorrect ? 'correct' : '',
                    selected && !rowCorrect ? 'wrong' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <button
                      key={duty}
                      type="button"
                      className={className}
                      disabled={matchLocked}
                      onClick={() => onPickDuty(role.id, duty)}
                    >
                      {duty}
                    </button>
                  )
                })}
              </div>
              {rowHints[role.id] && !rowCorrect ? (
                <p className="mission-feedback wrong">
                  <strong>× 还不是</strong>
                  <span>提示：{rowHints[role.id]}</span>
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
      {matchLocked ? (
        <>
          <p className="mission-feedback correct">
            <strong>✓ 判断正确</strong>
            <span>窑匠管烧，人夫管做，甲首管组织。这块砖上的责任链已经读通。</span>
          </p>
          <KioskButton onClick={finishQuest}>继续探索 →</KioskButton>
        </>
      ) : null}
    </section>
  )
}
