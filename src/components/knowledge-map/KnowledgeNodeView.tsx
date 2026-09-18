import type { MapPosition, NodeStatus } from '@/types'

const RING: Record<NodeStatus, string> = {
  locked: '#5a5348',
  // 可探索：暗金细环 + 空心，与完成态的亮金粗环 + 实心拉开差距。
  available: '#b0871f',
  discovered: '#c9a227',
  selected: '#f3ead7',
  completed: '#f4d06b',
}

const FILL: Record<NodeStatus, string> = {
  locked: '#2a251f',
  available: '#1b1712',
  discovered: '#241e16',
  selected: '#2a2218',
  // 完成态：实心金盘，远看即为“已盖章”。
  completed: '#c9971a',
}

const RING_WIDTH: Record<NodeStatus, number> = {
  locked: 1.5,
  available: 2,
  discovered: 1.5,
  selected: 3,
  completed: 3.5,
}

interface Props {
  title: string
  caption?: string
  status: NodeStatus
  /** 打开节点时 status 会变成 selected，用它保留节点原本的状态外观 */
  baseStatus?: NodeStatus
  position: MapPosition
  onOpen: () => void
}

export function KnowledgeNodeView({
  title,
  caption,
  status,
  baseStatus,
  position,
  onOpen,
}: Props) {
  // 选中只额外加一圈高亮，不替换节点自身的状态外观（否则完成态会被当成空心点）。
  const visual: NodeStatus = status === 'selected' && baseStatus ? baseStatus : status
  const locked = visual === 'locked'
  const available = visual === 'available'
  const completed = visual === 'completed'
  const selected = status === 'selected'

  return (
    <g
      className={`map-node map-node--${status}${completed ? ' is-completed' : ''}`}
      transform={`translate(${position.x}, ${position.y})`}
      onClick={locked ? undefined : onOpen}
      style={{ cursor: locked ? 'default' : 'pointer' }}
    >
      {completed ? (
        // 完成态柔光：稳定常亮，不做呼吸。
        <circle className="map-node__halo" r={34} fill="#d4a017" opacity={0.2} />
      ) : available || selected ? (
        <circle className="map-node__glow" r={34} fill="#d4a017" opacity={0.12} />
      ) : null}
      {selected ? <circle r={35} fill="none" stroke="#f3ead7" strokeWidth={2} opacity={0.9} /> : null}
      {/* Keep the visible node compact while giving touch screens a forgiving hit target. */}
      <circle r={52} fill="transparent" />
      <circle
        className="map-node__disc"
        r={28}
        fill={FILL[visual]}
        stroke={RING[visual]}
        strokeWidth={RING_WIDTH[visual]}
      />
      {locked ? (
        <g fill="none" stroke="#8a8174" strokeWidth={1.8}>
          <rect x={-7} y={-2} width={14} height={11} rx={2} />
          <path d="M-4 -2 V-7 a4 4 0 0 1 8 0 V-2" />
        </g>
      ) : completed ? (
        <path
          className="map-node__check"
          d="M-10 -1 L-3 7 L11 -9"
          fill="none"
          stroke="#fffaf0"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <circle r={4} fill="#d4a017" />
      )}
      <text y={50} textAnchor="middle" fill="#f3ead7" fontSize={18}>
        {title}
      </text>
      {caption ? (
        <text y={70} textAnchor="middle" fill="#9d9178" fontSize={13}>
          {caption}
        </text>
      ) : null}
    </g>
  )
}
