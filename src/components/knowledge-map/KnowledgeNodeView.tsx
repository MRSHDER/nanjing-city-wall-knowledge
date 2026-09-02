import type { MapPosition, NodeStatus } from '@/types'

const FILL: Record<NodeStatus, string> = {
  locked: '#4a4338',
  available: '#d4a017',
  discovered: '#e8d5a3',
  selected: '#f3ead7',
  completed: '#6f9e6b',
}

interface Props {
  title: string
  status: NodeStatus
  position: MapPosition
  onOpen: () => void
}

export function KnowledgeNodeView({ title, status, position, onOpen }: Props) {
  const locked = status === 'locked'

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      onClick={locked ? undefined : onOpen}
      style={{ cursor: locked ? 'default' : 'pointer' }}
    >
      <circle r={36} fill={FILL[status]} />
      <text
        y={64}
        textAnchor="middle"
        fill="#f3ead7"
        fontSize={20}
      >
        {locked ? '未解锁' : title}
      </text>
    </g>
  )
}
