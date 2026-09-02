import { KioskButton } from '@/components/common/KioskButton'
import { APP } from '@/config/app'
import { useExploration } from '@/state/ExplorationContext'

export function HomePage() {
  const { start } = useExploration()

  return (
    <main style={{ padding: 80 }}>
      <p>{APP.museum}</p>
      <h1>{APP.name}</h1>
      <p>触摸节点，阅读城墙知识，完成探索任务，让知识网络逐渐展开。</p>
      <KioskButton onClick={start}>开始探索</KioskButton>
    </main>
  )
}
