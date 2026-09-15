import { useEffect, useState } from 'react'
import { KioskLayout } from './layouts/KioskLayout'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { useExploration } from './state/ExplorationContext'

type Scene = 'home' | 'explore'

const MAP_HOLD_MS = 520
const CURTAIN_MS = 1800

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

    setScene('explore')
    setShowCurtain(false)

    const startCurtain = window.setTimeout(() => setShowCurtain(true), MAP_HOLD_MS)
    const endCurtain = window.setTimeout(
      () => setShowCurtain(false),
      MAP_HOLD_MS + CURTAIN_MS,
    )

    return () => {
      window.clearTimeout(startCurtain)
      window.clearTimeout(endCurtain)
    }
  }, [session.started])

  return (
    <KioskLayout>
      {scene === 'home' ? <HomePage /> : <ExplorePage />}
      {showCurtain ? (
        <div className="enter-curtain" aria-hidden="true">
          <p>从一块城砖开始</p>
        </div>
      ) : null}
    </KioskLayout>
  )
}
