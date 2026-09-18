import { useEffect, useState } from 'react'
import { exhibitImages } from '@/data/images'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import './brick-observation.css'

interface Props {
  mission: Mission
  onObserved?: (observed: boolean) => void
}

/**
 * 城砖相关的图片观察任务：点击图片完成一次观察，不做坐标热点识别。
 * 观察素材与文案由 mission.observation 提供，城砖、城砖铭文两个节点共用同一组件。
 */
export function BrickObservation({ mission, onObserved }: Props) {
  const { session } = useExploration()
  const observation = mission.observation
  /** 进入节点时任务是否已经完成：重访时直接显示已完成观察，不要求重做。 */
  const [revisit] = useState(() => session.completedMissionIds.includes(mission.id))
  const [observed, setObserved] = useState(revisit)
  const image = observation ? exhibitImages[observation.imageId] : undefined

  useEffect(() => {
    onObserved?.(observed)
  }, [observed, onObserved])

  if (!observation) return null

  function onObserve() {
    if (observed) return
    setObserved(true)
  }

  return (
    <section className="brick-observation" aria-label="城砖观察任务">
      <div className="mission-kicker">观察任务</div>
      <h3>{mission.title}</h3>
      <p className="brick-observation__prompt">{observation.prompt}</p>

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
          <strong>{revisit ? '✓ 已完成观察' : observation.findingTitle}</strong>
          <span>{observation.findingText}</span>
        </div>
      ) : null}
    </section>
  )
}
