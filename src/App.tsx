import { useEffect, useState, type CSSProperties } from 'react'
import { KioskLayout } from './layouts/KioskLayout'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { useExploration } from './state/ExplorationContext'

type Scene = 'home' | 'explore'

/** 幕布落下后切换到图谱场景（此时幕布全黑，切换过程看不见） */
const SWAP_MS = 360
/** 开场总时长。enter.css 的动画时长直接取这个值，避免 JS 已撤幕而 CSS 还在播。 */
const CURTAIN_MS = 1000

export function App() {
  const { session } = useExploration()
  const [scene, setScene] = useState<Scene>('home')
  const [showCurtain, setShowCurtain] = useState(false)

  useEffect(() => {
    if (!session.started) {
      setScene('home')
      setShowCurtain(false)
      return
    }

    setShowCurtain(true)

    const swap = window.setTimeout(() => setScene('explore'), SWAP_MS)
    const hide = window.setTimeout(() => setShowCurtain(false), CURTAIN_MS)

    return () => {
      window.clearTimeout(swap)
      window.clearTimeout(hide)
    }
  }, [session.started])

  return (
    <KioskLayout>
      {scene === 'home' ? <HomePage /> : <ExplorePage />}
      {showCurtain ? (
        <div
          className="enter-curtain"
          style={{ '--curtain-ms': `${CURTAIN_MS}ms` } as CSSProperties}
          aria-hidden="true"
        >
          <p>从一块城砖开始</p>
        </div>
      ) : null}
    </KioskLayout>
  )
}
