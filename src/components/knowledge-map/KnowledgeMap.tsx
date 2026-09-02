import { useNodeView } from '@/hooks/useNodeView'
import { useExploration } from '@/state/ExplorationContext'
import { canOpenNode } from '@/utils/nodeStatus'
import { KnowledgeEdge } from './KnowledgeEdge'
import { KnowledgeNodeView } from './KnowledgeNodeView'

const VIEW = { width: 1920, height: 820 }

export function KnowledgeMap() {
  const { nodes, relations } = useNodeView()
  const { select } = useExploration()

  return (
    <svg
      className="knowledge-map"
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      role="img"
      aria-label="南京城墙知识图谱"
    >
      {relations.map((relation) => {
        const from = nodes.find((item) => item.node.id === relation.from)
        const to = nodes.find((item) => item.node.id === relation.to)
        if (!from || !to) return null
        return (
          <KnowledgeEdge
            key={relation.id}
            relation={relation}
            from={from.position}
            to={to.position}
            visible={from.status !== 'locked' || to.status !== 'locked'}
          />
        )
      })}
      {nodes.map((item) => (
        <KnowledgeNodeView
          key={item.node.id}
          title={item.node.title}
          status={item.status}
          position={item.position}
          onOpen={() => {
            if (canOpenNode(item.status)) select(item.node.id)
          }}
        />
      ))}
    </svg>
  )
}
