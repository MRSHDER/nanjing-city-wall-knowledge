import { knowledgeService } from '@/services/knowledgeService'
import { useExploration } from '@/state/ExplorationContext'

export function AchievementList() {
  const { session } = useExploration()
  const items = knowledgeService.getAchievements()

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {session.unlockedAchievementIds.includes(item.id) ? '已获得' : '未获得'} ·{' '}
          {item.title}
        </li>
      ))}
    </ul>
  )
}
