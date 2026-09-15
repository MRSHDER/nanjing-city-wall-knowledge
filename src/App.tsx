import { useEffect, useState } from 'react'
import { KioskLayout } from './layouts/KioskLayout'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { useExploration } from './state/ExplorationContext'

type Scene = 'home' | 'explore'

const SWAP_MS = 360
const CURTAIN_MS = 2000

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
        <div className="enter-curtain" aria-hidden="true">
          <p>从一块城砖开始</p>
        </div>
      ) : null}
    </KioskLayout>
  )
}
