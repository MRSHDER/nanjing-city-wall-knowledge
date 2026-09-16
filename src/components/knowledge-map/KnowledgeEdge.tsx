import type { KnowledgeRelation, MapPosition, NodeStatus } from '@/types'

interface Props {
  relation: KnowledgeRelation
  from: MapPosition
  to: MapPosition
  fromStatus: NodeStatus
  toStatus: NodeStatus
}

const MAIN_ROUTE_RELATIONS = new Set([
  'rel-wall-four',
  'rel-four-gate',
  'rel-gate-weng',
  'rel-weng-brick',
  'rel-brick-inscription',
  'rel-inscription-duty',
  'rel-duty-origin',
  'rel-origin-logistics',
])

function createRoutePath(from: MapPosition, to: MapPosition, isMainRoute: boolean) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.hypot(dx, dy)

  if (!isMainRoute || distance < 260) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  }

  const bendX = from.x + dx * 0.48
  const bendY = from.y + dy * 0.18
  return `M ${from.x} ${from.y} L ${bendX} ${bendY} L ${to.x} ${to.y}`
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
  const isMainRoute = MAIN_ROUTE_RELATIONS.has(relation.id)
  const path = createRoutePath(from, to, isMainRoute)
  const label = getLabelPosition(from, to)
  const color = completed ? '#7fb277' : lit ? '#d4a017' : '#8a7348'

  if (!isMainRoute) {
    return (
      <g className={lit ? 'map-edge map-edge--lit' : 'map-edge'}>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={completed ? 4 : lit ? 3 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={lit ? 0.72 : 0.32}
          strokeDasharray="10 12"
        />
        {relation.label && lit ? (
          <text
            x={label.x}
            y={label.y}
            textAnchor="middle"
            fill="#cbb892"
            fontSize={13}
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

  return (
    <g className={lit ? 'map-edge map-edge--lit' : 'map-edge'}>
      <path
        d={path}
        fill="none"
        stroke="#2b2418"
        strokeWidth={completed ? 13 : lit ? 12 : 8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={lit ? 0.78 : 0.32}
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={completed ? 6 : lit ? 5 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={lit ? 0.94 : 0.44}
      />
      <path
        d={path}
        fill="none"
        stroke="#f3dd9e"
        strokeWidth={completed ? 1.5 : lit ? 1.2 : 0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="12 18"
        strokeOpacity={lit ? 0.46 : 0.18}
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
