import { catalog, missions, achievements } from '@/data'
import type {
  Achievement,
  KnowledgeCatalog,
  KnowledgeNode,
  KnowledgeRelation,
  Mission,
  NodeId,
} from '@/types'

export interface KnowledgeService {
  getCatalog(): KnowledgeCatalog
  getNode(id: NodeId): KnowledgeNode | undefined
  getRelationsOf(id: NodeId): KnowledgeRelation[]
  getMissionByNode(id: NodeId): Mission | undefined
  getAchievements(): Achievement[]
}

export const knowledgeService: KnowledgeService = {
  getCatalog() {
    return catalog
  },

  getNode(id) {
    return catalog.nodes.find((node) => node.id === id)
  },

  getRelationsOf(id) {
    return catalog.relations.filter((rel) => rel.from === id || rel.to === id)
  },

  getMissionByNode(id) {
    const node = catalog.nodes.find((item) => item.id === id)
    if (!node?.missionId) return undefined
    return missions.find((mission) => mission.id === node.missionId)
  },

  getAchievements() {
    return achievements
  },
}
