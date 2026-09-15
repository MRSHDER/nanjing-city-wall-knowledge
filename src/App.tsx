import { useEffect, useState } from 'react'
import { KioskLayout } from './layouts/KioskLayout'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { useExploration } from './state/ExplorationContext'

type Scene = 'home' | 'transit' | 'explore'

const CURTAIN_MS = 1600

export function App() {
  const { session } = useExploration()
  const [scene, setScene] = useState<Scene>('home')

  useEffect(() => {
    if (!session.started) {
      setScene('home')
      return
    }

    setScene('transit')
    const timer = window.setTimeout(() => setScene('explore'), CURTAIN_MS)
    return () => window.clearTimeout(timer)
  }, [session.started])

  return (
    <KioskLayout>
      {scene === 'home' ? <HomePage /> : <ExplorePage />}
      {scene === 'transit' ? (
        <div className="enter-curtain" aria-hidden="true">
          <p>从一块城砖开始</p>
        </div>
      ) : null}
    </KioskLayout>
  )
}
