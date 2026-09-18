import { Fragment, useState } from 'react'
import './brick-inscription-card.css'

/**
 * 砖面出现的身份。这里只展示“身份”，不展示具体姓名：
 * 姓名需要实物或资料依据，未经核实的姓名不作为真实铭文内容展示。
 */
const BRICK_ROLES = ['提调官', '司吏', '总甲', '甲首', '小甲', '窑匠', '造砖人夫'] as const

/** 城砖铭文中可以读出的四级责任层级（职责说明取自节点既有内容） */
const TRACE_STEPS = [
  { id: '01', title: '府县提调官与司吏', note: '府、县两级提调与文书' },
  { id: '02', title: '总甲 / 甲首 / 小甲', note: '基层里甲组织' },
  { id: '03', title: '窑匠', note: '负责烧造工艺' },
  { id: '04', title: '造砖人夫', note: '直接参与制砖' },
] as const

interface Props {
  /** clue：铭文节点的线索卡；trace：责任链节点的“线索 → 追踪 → 层级” */
  variant?: 'clue' | 'trace'
  onTrace?: () => void
}

export function BrickInscriptionCard({ variant = 'clue', onTrace }: Props) {
  const [tracing, setTracing] = useState(false)

  if (variant === 'clue') {
    return (
      <section className="brick-inscription-card" aria-label="城砖铭文线索">
        <div className="brick-inscription-card__label">观察线索</div>
        <div className="brick-inscription-card__copy">
          <strong>砖上的名字，不只是名字。</strong>
          <p>它们记录了谁参与生产、谁承担责任。看清这个点，就能回答下面这一题。</p>
        </div>
      </section>
    )
  }

  return (
    <section className="brick-inscription-card" aria-label="城砖铭文线索与责任层级">
      <div className="brick-inscription-card__label">砖文档案 · 线索</div>

      <div className="brick-inscription-card__brick" aria-label="城砖铭文中出现的身份">
        {BRICK_ROLES.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>

      <div className="brick-inscription-card__copy">
        <strong>砖上的名字，不只是名字。</strong>
        <p>砖面上的名字来自不同身份的人。顺着这些身份，可以继续追踪一块城砖背后的生产组织。</p>
      </div>

      {tracing ? (
        <div className="brick-trace" aria-label="城砖责任层级">
          {TRACE_STEPS.map((step, index) => (
            <Fragment key={step.id}>
              {index > 0 ? <div className="brick-trace__line" /> : null}
              <div className="brick-trace__step">
                <b>{step.id}</b>
                <span>{step.title}</span>
                <small>{step.note}</small>
              </div>
            </Fragment>
          ))}
          <p className="brick-trace__hint">
            从管理人员到实际制砖者，不同身份共同出现在城砖的铭文记录中。
          </p>
        </div>
      ) : null}

      <button
        type="button"
        className="brick-inscription-card__action"
        aria-expanded={tracing}
        onClick={() => {
          setTracing(true)
          onTrace?.()
        }}
      >
        {tracing ? '继续下面的探索任务 ↓' : '追踪责任关系 →'}
      </button>
    </section>
  )
}
