import { KioskButton } from '@/components/common/KioskButton'
import { APP } from '@/config/app'
import { useExploration } from '@/state/ExplorationContext'

function MuseumLogo() {
  return (
    <svg
      className="home-brand__logo"
      viewBox="0 0 370 76"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <polygon points="2,33 81,44 258,70 263,72 2,72" />
        <polygon points="30,10 203,35 123,48 30,34" />
        <polygon points="151,9 210,1 211,17 155,10" />
        <polygon points="137,49 166,44 301,23 361,14 366,14 366,72 287,72 250,67 149,52 137,50" />
      </g>
    </svg>
  )
}

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
          <MuseumLogo />
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
      </div>
    </main>
  )
}
