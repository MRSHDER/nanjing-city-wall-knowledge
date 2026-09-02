import { useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import { KioskButton } from '../common/KioskButton'

const ROLES = [
  {
    id: 'jiaoshou',
    name: '甲首',
    duty: '基层组织负责人，向上对接总甲，向下联络小甲与人夫',
  },
  {
    id: 'yaojiang',
    name: '窑匠',
    duty: '掌握烧造工艺，对入窑成砖的质量负责',
  },
  {
    id: 'renfu',
    name: '造砖人夫',
    duty: '直接参与制坯、运泥等劳作',
  },
] as const

const DUTY_OPTIONS = ROLES.map((role) => role.duty)

interface Props {
  mission: Mission
}

export function InscriptionQuest({ mission }: Props) {
  const { session, finishMission } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)
  const [step, setStep] = useState<'observe' | 'judge' | 'match' | 'conclude'>(
    done ? 'conclude' : 'observe',
  )
  const [judgeId, setJudgeId] = useState<string | null>(null)
  const [judgeWrong, setJudgeWrong] = useState(false)
  const [picks, setPicks] = useState<Record<string, string>>({})
  const [matchWrong, setMatchWrong] = useState(false)

  function submitJudge() {
    if (judgeId === 'jiaoshou') {
      setJudgeWrong(false)
      setStep('match')
    } else {
      setJudgeWrong(true)
    }
  }

  function submitMatch() {
    const allCorrect = ROLES.every((role) => picks[role.id] === role.duty)
    if (!allCorrect) {
      setMatchWrong(true)
      return
    }
    setMatchWrong(false)
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
        <h3>「甲首」更接近哪种角色？</h3>
        <div className="mission-choices">
          <button type="button" className={judgeId === 'jiaoshou' ? 'mission-choice selected' : 'mission-choice'} onClick={() => { setJudgeId('jiaoshou'); setJudgeWrong(false) }}>基层组织里的负责人</button>
          <button type="button" className={judgeId === 'officer' ? 'mission-choice selected' : 'mission-choice'} onClick={() => { setJudgeId('officer'); setJudgeWrong(false) }}>负责验收城门的武将</button>
          <button type="button" className={judgeId === 'scribe' ? 'mission-choice selected' : 'mission-choice'} onClick={() => { setJudgeId('scribe'); setJudgeWrong(false) }}>只负责在砖上画画的画师</button>
        </div>
        {judgeWrong ? <p className="mission-feedback wrong">再看一眼砖文。甲首写在总甲之后、小甲之前。</p> : null}
        <KioskButton disabled={!judgeId} onClick={submitJudge}>确认判断</KioskButton>
      </section>
    )
  }

  return (
    <section className="inscription-quest" aria-label="匹配职责">
      <div className="mission-kicker">第三步 · 推理</div>
      <h3>把三种身份和职责对上</h3>
      <p>点选每一行的职责。三行都对上，这块砖的责任链才算读通。</p>
      <div className="role-match">
        {ROLES.map((role) => (
          <div key={role.id} className="role-match__row">
            <strong>{role.name}</strong>
            <div className="role-match__duties">
              {DUTY_OPTIONS.map((duty) => (
                <button
                  key={duty}
                  type="button"
                  className={picks[role.id] === duty ? 'mission-choice selected' : 'mission-choice'}
                  onClick={() => {
                    setPicks((prev) => ({ ...prev, [role.id]: duty }))
                    setMatchWrong(false)
                  }}
                >
                  {duty}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {matchWrong ? <p className="mission-feedback wrong">还有对不上的一行。窑匠管烧，人夫管做，甲首管组织。</p> : null}
      <KioskButton disabled={ROLES.some((role) => !picks[role.id])} onClick={submitMatch}>
        得出结论
      </KioskButton>
    </section>
  )
}
