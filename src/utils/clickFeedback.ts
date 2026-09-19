import '../styles/click-feedback.css'

/**
 * 全局点击反馈：在按下位置生成一个金色小波纹（#D4A017）。
 *
 * 设计约束：
 * - 只在 document 上挂一个「捕获阶段」的 pointerdown 监听：鼠标 / 触控 / 触控笔走同一条路径；
 * - 不 preventDefault、不 stopPropagation、不等动画 —— 业务逻辑（含页面跳转）照常立即执行；
 * - 波纹 pointer-events: none，永远不会挡住随后派发的 click；
 * - 动画只用 transform + opacity，播完立即移除节点，不常驻 DOM；
 * - 需要覆盖在 <dialog> 之上时用 popover 进入 top layer，否则普通节点会被盖住；
 * - prefers-reduced-motion: reduce 时不做扩散，只保留一次极轻微的高亮。
 *
 * 新增按钮无需任何改动：只要元素可点（button / a / [role=button] / .map-node，
 * 或 cursor: pointer），波纹自动生效。
 */

const INTERACTIVE_SELECTOR = [
  'button',
  'a',
  '[role="button"]',
  '.map-node',
  'summary',
  'label',
  'input',
  'select',
  'textarea',
].join(',')

/** 波纹直径；半径约 50px，控制在“点击点附近”的小范围反馈 */
const RIPPLE_SIZE = 100
const RIPPLE_DURATION = 260
const REDUCED_DURATION = 180
/** 防御性上限：极端连点时不无限堆积节点 */
const MAX_ALIVE = 16

let installed = false
let alive = 0

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** 这次按下是否落在可点击目标上。 */
function isInteractive(target: Element): boolean {
  if (target.closest(INTERACTIVE_SELECTOR)) return true
  // 兜底：项目里可点元素都设了 cursor: pointer，而 cursor 可继承，子元素同样命中
  return window.getComputedStyle(target).cursor === 'pointer'
}

function spawn(x: number, y: number): void {
  if (alive >= MAX_ALIVE) return
  const reduced = prefersReducedMotion()

  const node = document.createElement('span')
  node.className = 'click-ripple'
  node.setAttribute('aria-hidden', 'true')
  node.style.width = `${RIPPLE_SIZE}px`
  node.style.height = `${RIPPLE_SIZE}px`
  node.style.left = `${x}px`
  node.style.top = `${y}px`

  // 若当前有 <dialog> 等 top layer 内容，普通节点会被盖住，用 popover 进入同一层
  const canPopover = typeof node.showPopover === 'function'
  if (canPopover) node.setAttribute('popover', 'manual')
  document.body.appendChild(node)
  if (canPopover) {
    try {
      node.showPopover()
    } catch {
      /* 进不了 top layer 也不影响反馈本身 */
    }
  }

  alive += 1
  // 注意：透明度不能用强 ease-out（会在前 1/3 就淡到看不见），
  // 因此前 55% 让尺寸带缓动扩散、透明度基本保持，末段再线性淡出。
  const frames = reduced
    ? [
        { transform: 'translate(-50%, -50%) scale(0.16)', opacity: 0.45 },
        { transform: 'translate(-50%, -50%) scale(0.16)', opacity: 0 },
      ]
    : [
        {
          transform: 'translate(-50%, -50%) scale(0.12)',
          opacity: 0.6,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        },
        {
          transform: 'translate(-50%, -50%) scale(0.72)',
          opacity: 0.42,
          offset: 0.55,
          easing: 'linear',
        },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
      ]

  const animation = node.animate(frames, {
    duration: reduced ? REDUCED_DURATION : RIPPLE_DURATION,
  })

  const cleanup = () => {
    animation.onfinish = null
    animation.oncancel = null
    node.remove()
    alive -= 1
  }
  animation.onfinish = cleanup
  animation.oncancel = cleanup
}

function onPointerDown(event: PointerEvent): void {
  // 鼠标只响应左键；触控与触控笔的 button 恒为 0
  if (event.pointerType === 'mouse' && event.button !== 0) return
  const target = event.target
  if (!(target instanceof Element)) return
  if (!isInteractive(target)) return
  spawn(event.clientX, event.clientY)
}

/** 在应用入口调用一次即可，全项目共用这一套反馈。 */
export function installClickFeedback(): void {
  if (installed || typeof document === 'undefined') return
  installed = true
  document.addEventListener('pointerdown', onPointerDown, true)
}
