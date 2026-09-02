import { KioskButton } from '@/components/common/KioskButton'
import { APP } from '@/config/app'
import { useExploration } from '@/state/ExplorationContext'

export function HomePage() {
  const { start } = useExploration()
  const hero = `${import.meta.env.BASE_URL}images/home-hero.jpg`

  return (
    <main
      className="home-page"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(12,10,8,.72) 12%, rgba(12,10,8,.28) 46%, rgba(12,10,8,.08) 70%), url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}
    >
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
