import { KioskLayout } from './layouts/KioskLayout'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { useExploration } from './state/ExplorationContext'

export function App() {
  const { session } = useExploration()

  return (
    <KioskLayout>
      {session.started ? <ExplorePage /> : <HomePage />}
    </KioskLayout>
  )
}
