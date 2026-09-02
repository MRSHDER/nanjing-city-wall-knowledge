import { KioskButton } from '@/components/common/KioskButton'
import { APP } from '@/config/app'
import { useExploration } from '@/state/ExplorationContext'

export function HomePage() {
  const { start } = useExploration()

  return (
    <main className="home-page">
      <div className="home-content">
        <div className="home-brand">
          <span className="home-brand__mark" aria-hidden />
          <div>
            <strong>{APP.museum}</strong>
            <small>NANJING CITY WALL MUSEUM</small>
          </div>
        </div>
        <h1>
          南京明城墙
          <em>知识探索</em>
        </h1>
        <p className="lead">
          从一块城砖、一座城门开始
          <br />
          沿着知识关系，探索一座城墙背后的历史
        </p>
        <KioskButton className="home-cta" onClick={start}>
          开始探索 →
        </KioskButton>
        <div className="home-foot">
          <span>城墙知识探索 · 01</span>
          <span>触屏开始体验</span>
        </div>
      </div>
    </main>
  )
}
