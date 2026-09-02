interface BrickInscriptionCardProps {
  onTrace: () => void
}

export function BrickInscriptionCard({ onTrace }: BrickInscriptionCardProps) {
  return (
    <section className="brick-inscription-card" aria-label="城砖铭文线索">
      <div className="brick-inscription-card__label">砖文档案 · 线索 01</div>
      <div className="brick-inscription-card__brick" aria-hidden="true">
        <span>捴甲</span>
        <span>黄原亨</span>
        <span>甲首</span>
        <span>刘德華</span>
        <span>窑匠</span>
        <span>晏文叁</span>
        <span>造磚人夫</span>
      </div>
      <div className="brick-inscription-card__copy">
        <strong>砖上的名字，不只是名字。</strong>
        <p>
          明代城砖常把烧造过程中不同层级的责任人留下来。顺着这些名字，我们可以追踪一块砖从哪里来、由谁负责、谁参与烧造。
        </p>
      </div>
      <button type="button" className="brick-inscription-card__action" onClick={onTrace}>
        追踪这块砖的来路 →
      </button>
    </section>
  )
}
