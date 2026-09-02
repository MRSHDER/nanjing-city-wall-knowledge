import type { NodeId } from './ids'

export interface SearchQuery {
  text: string
}

export interface SearchHit {
  nodeId: NodeId
  title: string
  reason: string
  score: number
}

export interface SearchResult {
  query: SearchQuery
  hits: SearchHit[]
  /** 建议按顺序探索的节点。第一阶段可为空。 */
  suggestedPath: NodeId[]
  /** 第一阶段固定 false。接入 LLM 后由实现填写。 */
  usedLanguageModel: boolean
}

export interface AskQuestionInput {
  question: string
  currentNodeId?: NodeId
}

export interface AskQuestionResult {
  answer: string
  relatedNodeIds: NodeId[]
  usedLanguageModel: boolean
}
