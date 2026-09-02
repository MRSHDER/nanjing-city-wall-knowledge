import type { MapPosition, NodeStatus } from '@/types'

const RING: Record<NodeStatus, string> = {
  locked: '#5a5348',
  available: '#d4a017',
  discovered: '#c9a227',
  selected: '#f3ead7',
  completed: '#d4a017',
}

const FILL: Record<NodeStatus, string> = {
  locked: '#2a251f',
  available: '#1b1712',
  discovered: '#241e16',
  selected: '#2a2218',
  completed: '#1f1b14',
}

interface Props {
  title: string
  caption?: string
  status: NodeStatus
  position: MapPosition
  onOpen: () => void
}

export function KnowledgeNodeView({ title, caption, status, position, onOpen }: Props) {
  const locked = status === 'locked'
  const available = status === 'available'
  const completed = status === 'completed'
  const selected = status === 'selected'

  return (
    <g
      className={`map-node map-node--${status}`}
      transform={`translate(${position.x}, ${position.y})`}
      onClick={locked ? undefined : onOpen}
      style={{ cursor: locked ? 'default' : 'pointer' }}
    >
      {available || selected ? (
        <circle className="map-node__glow" r={54} fill="#d4a017" opacity={0.2} />
      ) : null}
      <circle r={40} fill="transparent" />
      <circle
        r={28}
        fill={FILL[status]}
        stroke={RING[status]}
        strokeWidth={available || completed || selected ? 3 : 1.5}
      />
      {completed ? (
        <circle r={22} fill="none" stroke="#d4a017" strokeWidth={1.5} opacity={0.7} />
      ) : null}
      {locked ? (
        <g fill="none" stroke="#8a8174" strokeWidth={1.8}>
          <rect x={-7} y={-2} width={14} height={11} rx={2} />
          <path d="M-4 -2 V-7 a4 4 0 0 1 8 0 V-2" />
        </g>
      ) : (
        <circle r={4} fill={completed ? '#d4a017' : '#e8d5a3'} />
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
