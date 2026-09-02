import { KioskButton } from '@/components/common/KioskButton'
import { APP } from '@/config/app'
import { useExploration } from '@/state/ExplorationContext'

export function HomePage() {
  const { start } = useExploration()

  return (
    <main className="home-page">
      <div className="home-content">
        <div className="home-eyebrow">南京城墙博物馆 · 城墙知识探索</div>
        <h1>{APP.name}</h1>
        <p className="lead">
          从一块城砖、一座城门开始，沿着知识关系探索南京明城墙。每完成一次探索，新的知识节点都会逐渐展开。
        </p>
        <KioskButton onClick={start}>开始探索</KioskButton>
      </div>
    </main>
  )
}
