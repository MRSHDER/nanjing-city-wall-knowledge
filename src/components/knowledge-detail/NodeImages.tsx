import { type PointerEvent, useRef, useState } from 'react'
import { exhibitImages, type ExhibitImage } from '@/data/images'
import './node-images.css'

type Position = { x: number; y: number }

const MIN_SCALE = 1
const MAX_SCALE = 3
const SCALE_STEP = 0.5

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))
}

function ExhibitPhoto({ image }: { image: ExhibitImage }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const dragStart = useRef<{ pointerId: number; x: number; y: number; position: Position } | null>(null)
  const [failed, setFailed] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const src = `${import.meta.env.BASE_URL}${image.src}`
  const canDrag = scale > 1

  function resetView() {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  function openDialog() {
    resetView()
    dialog.current?.showModal()
  }

  function zoom(nextScale: number) {
    const safeScale = clampScale(nextScale)
    setScale(safeScale)
    if (safeScale === 1) setPosition({ x: 0, y: 0 })
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!canDrag) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      position,
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = dragStart.current
    if (!start || start.pointerId !== event.pointerId) return

    setPosition({
      x: start.position.x + event.clientX - start.x,
      y: start.position.y + event.clientY - start.y,
    })
  }

  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current?.pointerId === event.pointerId) {
      dragStart.current = null
    }
  }

  return (
    <figure className="node-photo">
      {failed ? (
        <p role="status">图片暂时无法显示，请参考下方铭文线索。</p>
      ) : (
        <button type="button" className="node-photo__open" onClick={openDialog}>
          <img src={src} alt={image.alt} onError={() => setFailed(true)} />
          <span>点击放大观察 ↗</span>
        </button>
      )}
      <figcaption>{image.caption}</figcaption>
      <dialog ref={dialog} className="node-photo__dialog" aria-label={image.caption}>
        <div className="node-photo__toolbar">
          <div className="node-photo__hint">放大后可拖动图片查看砖文细节</div>
          <div className="node-photo__actions">
            <button type="button" onClick={() => zoom(scale - SCALE_STEP)} disabled={scale <= MIN_SCALE}>
              缩小
            </button>
            <button type="button" onClick={() => zoom(scale + SCALE_STEP)} disabled={scale >= MAX_SCALE}>
              放大
            </button>
            <button type="button" onClick={resetView}>
              重置
            </button>
            <form method="dialog">
              <button autoFocus>关闭图片，继续探索</button>
            </form>
          </div>
        </div>
        <div
          className={`node-photo__stage${canDrag ? ' is-draggable' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onPointerLeave={stopDrag}
        >
          <img
            src={src}
            alt={image.alt}
            draggable={false}
            style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
          />
        </div>
        <p>{image.caption}</p>
      </dialog>
    </figure>
  )
}

export function NodeImages({ imageIds }: { imageIds: string[] }) {
  return <>{imageIds.map((id) => exhibitImages[id] ? <ExhibitPhoto key={id} image={exhibitImages[id]} /> : null)}</>
}
