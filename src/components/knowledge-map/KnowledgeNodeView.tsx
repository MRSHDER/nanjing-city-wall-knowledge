import type { MapPosition, NodeStatus } from '@/types'

const FILL: Record<NodeStatus, string> = {
  locked: '#3d372f',
  available: '#d4a017',
  discovered: '#e8d5a3',
  selected: '#fff4d6',
  completed: '#7fb277',
}

interface Props {
  title: string
  status: NodeStatus
  position: MapPosition
  onOpen: () => void
}

export function KnowledgeNodeView({ title, status, position, onOpen }: Props) {
  const locked = status === 'locked'
  const lit =
    status === 'available' ||
    status === 'selected' ||
    status === 'completed' ||
    status === 'discovered'

  return (
    <g
      className={`map-node map-node--${status}`}
      transform={`translate(${position.x}, ${position.y})`}
      onClick={locked ? undefined : onOpen}
      style={{ cursor: locked ? 'default' : 'pointer' }}
    >
      {lit ? <circle className="map-node__glow" r={52} fill={FILL[status]} opacity={0.22} /> : null}
      <circle r={48} fill="transparent" />
      <circle
        r={34}
        fill={FILL[status]}
        stroke={lit ? '#f3ead7' : '#2a241c'}
        strokeWidth={lit ? 3 : 1}
      />
      <text y={62} textAnchor="middle" fill="#f3ead7" fontSize={20}>
        {locked ? '未点亮' : title}
      </text>
    </g>
  )
}
