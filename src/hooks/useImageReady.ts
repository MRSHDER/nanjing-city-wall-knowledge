import { useEffect, useState } from 'react'
import { getImageState, subscribeImage, type ImageStatus } from '@/services/imagePreloader'

interface ImageReadyState {
  status: ImageStatus
  width: number
  height: number
  /** 是否仍在等待（含尚未开始），组件据此显示占位 */
  loading: boolean
}

/** 订阅某张图的预加载状态；图片显示组件用它决定占位、预留比例与淡入。 */
export function useImageReady(url: string): ImageReadyState {
  const [state, setState] = useState(() => getImageState(url))

  useEffect(() => {
    setState(getImageState(url))
    return subscribeImage(url, () => setState(getImageState(url)))
  }, [url])

  return {
    ...state,
    loading: state.status !== 'ready' && state.status !== 'failed',
  }
}
