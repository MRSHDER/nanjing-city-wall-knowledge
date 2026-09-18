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

interface EdgeGeometry {
  d: string
  label: { x: number; y: number }
}

/**
 * 手工绕行线路。
 * 只覆盖必须绕开节点与文字的少数关系；未列出的关系仍按两节点直连绘制。
 * 路径用 from/to 现算，节点坐标微调时线路会跟着走。
 */
function createDetourRoute(
  relationId: string,
  from: MapPosition,
  to: MapPosition,
): EdgeGeometry | null {
  switch (relationId) {
    // 城砖铭文 → 城墙与今天：从节点左下方出线，绕开自身名称，
    // 沿构图下缘回到左中下的终点，不横穿中部的 城门—瓮城 一组。
    case 'rel-inscription-heritage': {
      const start = { x: from.x - 100, y: from.y + 90 }
      const end = { x: to.x + 540, y: to.y - 50 }
      return {
        d: `M ${from.x} ${from.y} C ${start.x} ${start.y}, ${end.x} ${end.y}, ${to.x} ${to.y}`,
        label: { x: to.x + 377, y: to.y - 103 },
      }
    }

    default:
      return null
  }
}

function createRoutePath(from: MapPosition, to: MapPosition) {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
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
  const detour = createDetourRoute(relation.id, from, to)
  const path = detour?.d ?? createRoutePath(from, to)
  const label = detour?.label ?? getLabelPosition(from, to)
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
