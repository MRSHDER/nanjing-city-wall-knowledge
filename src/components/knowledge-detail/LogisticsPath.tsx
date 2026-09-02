import { useState } from 'react'

const STAGES = [
  { id: 'kiln', title: '砖窑', text: '窑址多靠近河流。泥土、柴薪和成品砖都要便于装船，所以产地往往沿着水系铺开。' },
  { id: 'load', title: '装运', text: '验收后的城砖被集中装运。一块砖大约二十公斤，数量以百万、千万计，装运本身就是工程。' },
  { id: 'river', title: '江河水系', text: '长江及其支流把湖广、江西、南直隶等地和南京连在一起。水运是跨府县调砖的主要方式。' },
  { id: 'nanjing', title: '南京', text: '砖运抵应天府后进入都城营建现场。产地可以远在江西都昌、安徽南陵，终点却是同一座城。' },
  { id: 'wall', title: '城墙', text: '砖砌入墙体后，侧面铭文常常被压在缝里。今天能读到的，是偶尔露出或被征集保存的那一部分。' },
] as const

export function LogisticsPath() {
  const [activeId, setActiveId] = useState<(typeof STAGES)[number]['id']>('kiln')
  const active = STAGES.find((stage) => stage.id === activeId) ?? STAGES[0]

  return (
    <section className="logistics-path" aria-label="大明物流路径">
      <div className="mission-kicker">运输链</div>
      <div className="logistics-path__steps">
        {STAGES.map((stage, index) => (
          <button
            key={stage.id}
            type="button"
            className={stage.id === activeId ? 'logistics-step selected' : 'logistics-step'}
            onClick={() => setActiveId(stage.id)}
          >
            <b>0{index + 1}</b>
            {stage.title}
          </button>
        ))}
      </div>
      <p className="logistics-path__text">
        <strong>{active.title}</strong>
        {active.text}
      </p>
    </section>
  )
}
