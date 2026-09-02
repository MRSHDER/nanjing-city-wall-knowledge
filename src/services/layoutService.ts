import type { KnowledgeNode, MapPosition, NodeId } from '@/types'

/**
 * 布局可替换点。
 * 第一阶段直接返回数据里的人工坐标。
 * 以后换成自动布局时，只改这个文件。
 */
export interface LayoutService {
  getPosition(node: KnowledgeNode): MapPosition
  getAllPositions(nodes: KnowledgeNode[]): Record<NodeId, MapPosition>
}

export const presetLayoutService: LayoutService = {
  getPosition(node) {
    return node.position
  },

  getAllPositions(nodes) {
    const result: Record<NodeId, MapPosition> = {}
    for (const node of nodes) {
      result[node.id] = node.position
    }
    return result
  },
}

export const layoutService = presetLayoutService
