import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import { KioskButton } from '../common/KioskButton'

interface Props {
  mission: Mission
}

export function MissionPanel({ mission }: Props) {
  const { session, finishMission } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)

  return (
    <section>
      <h3>{mission.title}</h3>
      <p>{mission.prompt}</p>
      {done ? (
        <p>任务已完成，新的知识节点可能已解锁。</p>
      ) : (
        <KioskButton onClick={() => finishMission(mission)}>
          {mission.kind === 'read' ? '我已阅读' : '完成探索任务'}
        </KioskButton>
      )}
    </section>
  )
}
