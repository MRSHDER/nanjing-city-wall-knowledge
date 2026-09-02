import { useState } from 'react'

interface BrickInscriptionCardProps {
  onTrace: () => void
}

export function BrickInscriptionCard({ onTrace }: BrickInscriptionCardProps) {
  const [tracing, setTracing] = useState(false)

  return (
    <section className="brick-inscription-card" aria-label="城砖铭文线索">
      <div className="brick-inscription-card__label">砖文档案 · 线索 01</div>
      <div className="brick-inscription-card__brick" aria-hidden="true">
        <span>捴甲 · 黄原亨</span>
        <span>甲首 · 刘德華</span>
        <span>窑匠 · 晏文叁</span>
        <span>造磚人夫 · 刘德華</span>
      </div>
      <div className="brick-inscription-card__copy">
        <strong>砖上的名字，不只是名字。</strong>
        <p>
          铭文把一块砖背后的生产关系留了下来。顺着这些身份，我们可以一步步追踪它的责任链。
        </p>
      </div>

      {tracing ? (
        <div className="brick-trace" aria-label="城砖责任链">
          <div className="brick-trace__step"><b>01</b><span>基层组织</span><small>总甲、甲首、小甲</small></div>
          <div className="brick-trace__line" />
          <div className="brick-trace__step"><b>02</b><span>窑匠</span><small>负责烧造工艺</small></div>
          <div className="brick-trace__line" />
          <div className="brick-trace__step"><b>03</b><span>造砖人夫</span><small>直接参与制砖</small></div>
          <p className="brick-trace__hint">你看到的不是一串孤立的人名，而是一套可以追溯的责任链。</p>
        </div>
      ) : null}

      <button
        type="button"
        className="brick-inscription-card__action"
        onClick={() => {
          setTracing(true)
          onTrace()
        }}
      >
        {tracing ? '继续下面的探索任务 ↓' : '追踪这块砖的来路 →'}
      </button>
    </section>
  )
}
