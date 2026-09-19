import { useRef, useState } from 'react'
import { exhibitImages, type ExhibitImage } from '@/data/images'
import { useImageReady } from '@/hooks/useImageReady'
import './node-images.css'

function ExhibitPhoto({ image }: { image: ExhibitImage }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${image.src}`
  // 预加载状态：未就绪时显示占位，就绪后淡入（图片框高度由 CSS 固定，不跳版）
  const { loading } = useImageReady(src)

  return (
    <figure className="node-photo">
      {failed ? <p role="status">图片暂时无法显示，请参考下方铭文线索。</p> : (
        <button
          type="button"
          className={`node-photo__open${loading ? ' is-loading' : ''}`}
          onClick={() => dialog.current?.showModal()}
        >
          <img src={src} alt={image.alt} onError={() => setFailed(true)} />
          <span>点击放大观察 ↗</span>
        </button>
      )}
      <figcaption>{image.caption}</figcaption>
      <dialog ref={dialog} className="node-photo__dialog" aria-label={image.caption}>
        <form method="dialog"><button autoFocus>关闭图片，继续探索</button></form>
        <img src={src} alt={image.alt} />
        <p>{image.caption}</p>
      </dialog>
    </figure>
  )
}

export function NodeImages({ imageIds }: { imageIds: string[] }) {
  return <>{imageIds.map((id) => exhibitImages[id] ? <ExhibitPhoto key={id} image={exhibitImages[id]} /> : null)}</>
}
