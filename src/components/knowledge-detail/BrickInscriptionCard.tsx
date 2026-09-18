export function BrickInscriptionCard() {
  return (
    <section className="brick-inscription-card" aria-label="城砖责任链示意">
      <div className="brick-inscription-card__label">砖文档案 · 责任顺序</div>
      <div className="brick-inscription-card__diagram">
        <div className="brick-inscription-card__brick" aria-hidden="true">
          <span>损甲 · 黄原亨</span>
          <span>甲首 · 刘德華</span>
          <span>窑匠 · 晏文叁</span>
          <span>造磚人夫 · 刘德華</span>
        </div>
        <div className="brick-trace" aria-label="城砖责任链">
          <div className="brick-trace__step">
            <b>01</b>
            <span>基层组织</span>
            <small>总甲、甲首、小甲</small>
          </div>
          <div className="brick-trace__line" />
          <div className="brick-trace__step">
            <b>02</b>
            <span>窑匠</span>
            <small>负责烧造工艺</small>
          </div>
          <div className="brick-trace__line" />
          <div className="brick-trace__step">
            <b>03</b>
            <span>造砖人夫</span>
            <small>直接参与制砖</small>
          </div>
        </div>
      </div>
      <p className="brick-trace__hint">砖上的名字不是装饰，而是可以顺着往下读的责任顺序。</p>
    </section>
  )
}
