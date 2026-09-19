import { useEffect, useRef, useState } from 'react'
import { exhibitImages } from '@/data/images'
import { useImageReady } from '@/hooks/useImageReady'
import { useExploration } from '@/state/ExplorationContext'
import type { Mission } from '@/types'
import './brick-observation.css'

interface Props {
  mission: Mission
  onObserved?: (observed: boolean) => void
}

/**
 * 图片观察任务：图片本身用于放大查看，观察是否完成由下方独立按钮确认。
 * 两者互不绑定——放大只打开 Dialog，只有“完成观察”才会结束观察步骤。
 * 素材与文案由 mission.observation 提供，所有观察型节点共用这一套交互。
 */
export function BrickObservation({ mission, onObserved }: Props) {
  const { session } = useExploration()
  const observation = mission.observation
  /** 进入节点时任务是否已经完成：重访时直接显示已完成观察，不要求重做。 */
  const [revisit] = useState(() => session.completedMissionIds.includes(mission.id))
  const [observed, setObserved] = useState(revisit)
  const dialog = useRef<HTMLDialogElement>(null)
  const image = observation ? exhibitImages[observation.imageId] : undefined
  const imageSrc = image ? `${import.meta.env.BASE_URL}${image.src}` : ''
  // 预加载状态：未就绪时显示占位，并用原始尺寸预留比例，避免图片出现时跳一下
  const { loading: imageLoading, width: imageW, height: imageH } = useImageReady(imageSrc)

  useEffect(() => {
    onObserved?.(observed)
  }, [observed, onObserved])

  if (!observation) return null

  /** 唯一的“完成观察”入口：主按钮与 Dialog 内按钮都走这里。 */
  function onObserve() {
    if (observed) return
    setObserved(true)
    if (dialog.current?.open) dialog.current.close()
  }

  function onZoomIn() {
    if (!dialog.current?.open) dialog.current?.showModal()
  }

  const confirmLabel = observed
    ? (observation.doneLabel ?? '✓ 已完成观察')
    : (observation.actionLabel ?? '完成观察')

  return (
    <section className="brick-observation" aria-label="图片观察任务">
      <div className="mission-kicker">观察任务</div>
      <h3>{mission.title}</h3>
      <p className="brick-observation__prompt">{observation.prompt}</p>

      {image ? (
        <>
          <button
            type="button"
            className={`brick-observation__frame${observed ? ' is-observed' : ''}${imageLoading ? ' is-loading' : ''}`}
            aria-label={`放大查看：${image.alt}`}
            onClick={onZoomIn}
          >
            <img
              src={imageSrc}
              alt={image.alt}
              style={imageW > 0 && imageH > 0 ? { aspectRatio: `${imageW} / ${imageH}` } : undefined}
            />
            <span className="brick-observation__zoom-hint">点击图片放大观察 ↗</span>
          </button>

          <dialog ref={dialog} className="node-photo__dialog" aria-label={image.alt}>
            <form method="dialog" className="brick-observation__dialog-bar">
              <button autoFocus>关闭</button>
              {observed ? null : (
                <button type="button" onClick={onObserve}>
                  完成观察
                </button>
              )}
            </form>
            <img src={`${import.meta.env.BASE_URL}${image.src}`} alt={image.alt} />
            <p>{image.caption}</p>
          </dialog>
        </>
      ) : null}

      <button
        type="button"
        className={`brick-observation__confirm${observed ? ' is-done' : ''}`}
        aria-disabled={observed}
        onClick={onObserve}
      >
        {confirmLabel}
      </button>

      {observed ? (
        <div className="brick-observation__finding" role="status" aria-live="polite">
          <strong>{revisit ? '✓ 已完成观察' : observation.findingTitle}</strong>
          <span>{observation.findingText}</span>
        </div>
      ) : null}
    </section>
  )
}
