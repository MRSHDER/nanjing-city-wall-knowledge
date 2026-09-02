import { catalog } from '@/data'
import type {
  AskQuestionInput,
  AskQuestionResult,
  SearchQuery,
  SearchResult,
} from '@/types'

/**
 * 智能检索边界。
 * 第一阶段：本地关键词匹配。
 * 以后在这里换成 LLM / 向量检索，不要改页面调用方式。
 */
export interface SearchService {
  search(query: SearchQuery): Promise<SearchResult>
  ask(input: AskQuestionInput): Promise<AskQuestionResult>
}

function matchScore(text: string, nodeTitle: string, nodeBody: string): number {
  const q = text.trim().toLowerCase()
  if (!q) return 0
  const title = nodeTitle.toLowerCase()
  const body = nodeBody.toLowerCase()
  if (title.includes(q)) return 1
  if (body.includes(q)) return 0.6
  const tokens = q.split(/\s+/).filter(Boolean)
  const hits = tokens.filter((token) => title.includes(token) || body.includes(token))
  return hits.length / Math.max(tokens.length, 1) * 0.5
}

export const localSearchService: SearchService = {
  async search(query) {
    const hits = catalog.nodes
      .map((node) => ({
        nodeId: node.id,
        title: node.title,
        reason: '本地关键词匹配（未接入大模型）',
        score: matchScore(query.text, node.title, `${node.summary} ${node.content}`),
      }))
      .filter((hit) => hit.score > 0)
      .sort((a, b) => b.score - a.score)

    return {
      query,
      hits,
      suggestedPath: hits.slice(0, 3).map((hit) => hit.nodeId),
      usedLanguageModel: false,
    }
  },

  async ask(input) {
    const result = await localSearchService.search({ text: input.question })
    const titles = result.hits.map((hit) => `「${hit.title}」`).join('、')

    return {
      answer: titles
        ? `当前为本地检索。与问题较相关的节点：${titles}。接入大模型后将生成完整讲解。`
        : '当前为本地检索，没有直接命中的节点。接入大模型后可回答开放问题。',
      relatedNodeIds: result.hits.map((hit) => hit.nodeId),
      usedLanguageModel: false,
    }
  },
}

export const searchService = localSearchService
