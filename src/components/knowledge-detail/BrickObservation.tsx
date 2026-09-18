import { useEffect, useState } from 'react'
import { exhibitImages } from '@/data/images'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import './brick-observation.css'

/** 观察素材：仓库现有的真实馆藏照片，暂与城砖铭文节点复用。 */
const BRICK_IMAGE_ID = 'liudehua-brick'

interface Props {
  mission: Mission
  onObserved?: (observed: boolean) => void
}

/** 城砖节点的观察型任务：点击砖面图片完成一次观察，不做坐标热点识别。 */
export function BrickObservation({ mission, onObserved }: Props) {
  const { session } = useExploration()
  const done = session.completedMissionIds.includes(mission.id)
  const [observed, setObserved] = useState(done)
  const image = exhibitImages[BRICK_IMAGE_ID]

  useEffect(() => {
    onObserved?.(observed)
  }, [observed, onObserved])

  function onObserve() {
    if (observed) return
    setObserved(true)
  }

  return (
    <section className="brick-observation" aria-label="城砖观察任务">
      <div className="mission-kicker">观察任务</div>
      <h3>{mission.title}</h3>
      <p className="brick-observation__prompt">{mission.prompt}</p>

      {image ? (
        <button
          type="button"
          className={`brick-observation__frame${observed ? ' is-observed' : ''}`}
          aria-pressed={observed}
          aria-label={observed ? '已观察砖面' : '点击城砖图片进行观察'}
          onClick={onObserve}
        >
          <img src={`${import.meta.env.BASE_URL}${image.src}`} alt={image.alt} />
          <span className="brick-observation__action">
            {observed ? '✓ 已观察砖面' : '点击城砖图片进行观察'}
          </span>
        </button>
      ) : null}

      {observed ? (
        <div className="brick-observation__finding" role="status" aria-live="polite">
          <strong>{done ? '✓ 已完成观察' : '发现线索｜砖面文字'}</strong>
          <span>
            城砖不仅是建筑材料，砖面留下的文字也成为今天认识南京城墙的重要历史信息。
          </span>
        </div>
      ) : null}
    </section>
  )
}
