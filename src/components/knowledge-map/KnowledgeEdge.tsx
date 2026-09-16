import type { KnowledgeRelation, MapPosition, NodeStatus } from '@/types'

interface Props {
  relation: KnowledgeRelation
  from: MapPosition
  to: MapPosition
  fromStatus: NodeStatus
  toStatus: NodeStatus
}

function createWallPath(from: MapPosition, to: MapPosition) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.hypot(dx, dy)

  if (distance < 260) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  }

  const horizontalFirst = Math.abs(dx) >= Math.abs(dy)
  const bend = horizontalFirst
    ? { x: from.x + dx * 0.58, y: from.y }
    : { x: from.x, y: from.y + dy * 0.58 }

  return `M ${from.x} ${from.y} L ${bend.x} ${bend.y} L ${to.x} ${to.y}`
}

function getLabelPosition(from: MapPosition, to: MapPosition) {
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - 16,
  }
}

export function KnowledgeEdge({ relation, from, to, fromStatus, toStatus }: Props) {
  const visible = fromStatus !== 'locked' || toStatus !== 'locked'
  if (!visible) return null

  const lit = fromStatus !== 'locked' && toStatus !== 'locked'
  const completed = fromStatus === 'completed' && toStatus === 'completed'
  const path = createWallPath(from, to)
  const label = getLabelPosition(from, to)
  const color = completed ? '#7fb277' : lit ? '#d4a017' : '#8a7348'

  return (
    <g className={lit ? 'map-edge map-edge--lit' : 'map-edge'}>
      <path
        d={path}
        fill="none"
        stroke="#2b2418"
        strokeWidth={completed ? 18 : lit ? 16 : 10}
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeOpacity={lit ? 0.82 : 0.36}
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={completed ? 8 : lit ? 7 : 4}
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeOpacity={lit ? 0.96 : 0.48}
      />
      <path
        d={path}
        fill="none"
        stroke="#f3dd9e"
        strokeWidth={completed ? 2 : lit ? 1.6 : 1}
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeDasharray="14 18"
        strokeOpacity={lit ? 0.55 : 0.22}
      />
      {relation.label && lit ? (
        <text
          x={label.x}
          y={label.y}
          textAnchor="middle"
          fill="#cbb892"
          fontSize={14}
          paintOrder="stroke"
          stroke="#14100c"
          strokeWidth={4}
        >
          {relation.label}
        </text>
      ) : null}
    </g>
  )
}
