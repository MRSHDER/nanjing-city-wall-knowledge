import { knowledgeService } from '@/services/knowledgeService'
import { layoutService } from '@/services/layoutService'
import { useExploration } from '@/state/ExplorationContext'
import type { NodeStatus } from '@/types'

export function useNodeView() {
  const { catalog, session } = useExploration()
  const positions = layoutService.getAllPositions(catalog.nodes)

  const nodes = catalog.nodes.map((node) => {
    const base = session.nodeStatusById[node.id]
    const status: NodeStatus =
      session.selectedNodeId === node.id ? 'selected' : base

    return {
      node,
      status,
      // 保留选中前的状态，供节点视图区分“已完成被打开”与“可探索被打开”。
      baseStatus: base,
      position: positions[node.id],
      mission: knowledgeService.getMissionByNode(node.id),
    }
  })

  return {
    nodes,
    relations: catalog.relations,
    selectedNodeId: session.selectedNodeId,
  }
}
