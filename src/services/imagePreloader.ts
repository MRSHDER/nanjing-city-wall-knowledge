import { exhibitImages } from '@/data/images'

/**
 * 统一的图片预加载与缓存状态中心。
 *
 * - 全项目只有这里创建 Image 对象，不重复请求同一张图；
 * - 对外提供「状态 / 原始尺寸 / 订阅变化」，组件据此显示占位并淡入；
 * - 新增图片只需在 data/images.ts 注册，这里自动纳入预加载范围；
 * - 预加载在首页渲染完成后的空闲时段后台进行，不阻塞首页与「开始探索」。
 */

export type ImageStatus = 'idle' | 'loading' | 'ready' | 'failed'

interface Entry {
  status: ImageStatus
  width: number
  height: number
  listeners: Set<() => void>
}

const entries = new Map<string, Entry>()

/** 页面背景 / 弹窗底图（不走展陈注册表，但同样需要提前备好），与展陈图片一起构成唯一清单 */
const PAGE_BACKGROUNDS = [
  'images/home-hero.jpg',
  'images/map-bg.jpg',
  'images/completion-bg.jpg',
]

function toUrl(src: string): string {
  return `${import.meta.env.BASE_URL}${src}`
}

/** 需要预加载的全部图片 URL（唯一清单，去重） */
export function getAllImageUrls(): string[] {
  const exhibits = Object.values(exhibitImages).map((image) => toUrl(image.src))
  const backgrounds = PAGE_BACKGROUNDS.map(toUrl)
  return [...new Set([...exhibits, ...backgrounds])]
}

function entryOf(url: string): Entry {
  let entry = entries.get(url)
  if (!entry) {
    entry = { status: 'idle', width: 0, height: 0, listeners: new Set() }
    entries.set(url, entry)
  }
  return entry
}

function notify(entry: Entry): void {
  for (const listener of entry.listeners) listener()
}

/** 读取某张图的预加载状态与原始尺寸 */
export function getImageState(url: string): { status: ImageStatus; width: number; height: number } {
  const entry = entries.get(url)
  return {
    status: entry?.status ?? 'idle',
    width: entry?.width ?? 0,
    height: entry?.height ?? 0,
  }
}

/** 订阅某张图的状态变化，返回取消订阅函数 */
export function subscribeImage(url: string, listener: () => void): () => void {
  const entry = entryOf(url)
  entry.listeners.add(listener)
  return () => {
    entry.listeners.delete(listener)
  }
}

/** 预加载一张图片。已经就绪（含浏览器缓存命中）时不会再次创建 Image。 */
export function preloadImage(url: string): Promise<void> {
  const entry = entryOf(url)

  if (entry.status === 'ready' || entry.status === 'failed') return Promise.resolve()

  if (entry.status === 'loading') {
    return new Promise((resolve) => {
      const wait = () => {
        if (entry.status === 'ready' || entry.status === 'failed') {
          entry.listeners.delete(wait)
          resolve()
        }
      }
      entry.listeners.add(wait)
    })
  }

  entry.status = 'loading'
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.loading = 'eager'

    const finish = (ok: boolean) => {
      entry.status = ok ? 'ready' : 'failed'
      entry.width = img.naturalWidth
      entry.height = img.naturalHeight
      notify(entry)
      resolve()
    }

    img.onload = () => {
      // decode() 让图片在真正绘制前完成解码，首次出现时不会闪一下
      if (typeof img.decode === 'function') {
        img.decode().then(
          () => finish(true),
          () => finish(true),
        )
      } else {
        finish(true)
      }
    }
    img.onerror = () => finish(false)
    img.src = url
  })
}

let scheduled = false

/**
 * 首页渲染完成后调用一次：浏览器空闲时后台依次预加载全部图片。
 * 顺序加载是为了不和首页资源、也不和用户点击「开始探索」抢带宽。
 */
export function scheduleImagePreload(): void {
  if (scheduled || typeof window === 'undefined') return
  scheduled = true

  const run = () => {
    const urls = getAllImageUrls()
    let index = 0
    const next = () => {
      if (index >= urls.length) return
      const url = urls[index]
      index += 1
      void preloadImage(url).then(() => {
        if (typeof requestIdleCallback === 'function') {
          requestIdleCallback(next, { timeout: 500 })
        } else {
          setTimeout(next, 60)
        }
      })
    }
    next()
  }

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 1200 })
  } else {
    setTimeout(run, 300)
  }
}
