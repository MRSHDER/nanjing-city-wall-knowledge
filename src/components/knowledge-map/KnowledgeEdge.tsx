import type { KnowledgeRelation, MapPosition, NodeStatus } from '@/types'

interface Props {
  relation: KnowledgeRelation
  from: MapPosition
  to: MapPosition
  fromStatus: NodeStatus
  toStatus: NodeStatus
}

export function KnowledgeEdge({ relation, from, to, fromStatus, toStatus }: Props) {
  const visible = fromStatus !== 'locked' || toStatus !== 'locked'
  if (!visible) return null

  const lit = fromStatus !== 'locked' && toStatus !== 'locked'
  const completed = fromStatus === 'completed' && toStatus === 'completed'

  return (
    <g className={lit ? 'map-edge map-edge--lit' : 'map-edge'}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={completed ? '#7fb277' : lit ? '#d4a017' : '#8a7348'}
        strokeWidth={completed ? 5 : lit ? 4 : 2}
        strokeOpacity={lit ? 0.95 : 0.45}
      />
      {relation.label && lit ? (
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 10}
          textAnchor="middle"
          fill="#cbb892"
          fontSize={14}
        >
          {relation.label}
        </text>
      ) : null}
    </g>
  )
}
