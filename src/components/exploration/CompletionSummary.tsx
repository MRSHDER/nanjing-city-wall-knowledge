import { useEffect, useRef, type CSSProperties } from 'react'
import { useExploration } from '@/state/ExplorationContext'
import './completion-summary.css'

/** 结算弹窗底图（与项目其他图片一致，走 BASE_URL，避免在 CSS 里写死基路径） */
const BG_IMAGE = `url(${import.meta.env.BASE_URL}images/completion-bg.jpg)`

export function CompletionSummary() {
  const { progress, session, reset } = useExploration()
  const dialog = useRef<HTMLDialogElement>(null)
  const shown = useRef(false)
  const complete = progress.totalNodeCount > 0 && progress.completedNodeCount === progress.totalNodeCount

  useEffect(() => {
    if (complete && !session.selectedNodeId && !shown.current) {
      dialog.current?.showModal()
      shown.current = true
    }
  }, [complete, session.selectedNodeId])

  if (!complete) return null

  return (
    <>
      <button className="completion-reopen" onClick={() => dialog.current?.showModal()}>探索已完成 · 查看总结</button>
      <dialog
        ref={dialog}
        className="completion-summary"
        aria-labelledby="completion-title"
        style={{ '--completion-bg': BG_IMAGE } as CSSProperties}
      >
        <div className="mission-kicker">本次城墙探索 · 已完成</div>
        <h2 id="completion-title">你读懂了城墙，也看见了造城的人</h2>
        <p>已完成全部 {progress.totalNodeCount} 个知识节点。</p>
        <ul>
          <li>从城垣与城门，认识南京城的空间和防御。</li>
          <li>从一块城砖上的名字，追踪生产与责任。</li>
          <li>从城砖的来源与运输，连接过去的工程和今天的守护。</li>
        </ul>
        <p>回到展厅，再找一块有铭文的城砖：你能读出它留下的什么线索？</p>
        <form method="dialog"><button autoFocus>回看知识图谱</button></form>
        <button onClick={reset}>结束本次探索，返回首页</button>
      </dialog>
    </>
  )
}
