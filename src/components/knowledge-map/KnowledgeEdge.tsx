import type { KnowledgeRelation, MapPosition } from '@/types'

interface Props {
  relation: KnowledgeRelation
  from: MapPosition
  to: MapPosition
  visible: boolean
}

export function KnowledgeEdge({ from, to, visible }: Props) {
  if (!visible) return null

  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="#8a7348"
      strokeWidth={3}
    />
  )
}
