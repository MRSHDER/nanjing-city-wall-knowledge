import type { AchievementId, MissionId, NodeId } from './ids'

export type MissionKind = 'read' | 'choose' | 'observe'

export interface MissionChoice {
  id: string
  label: string
  correct: boolean
  /** 点到错误选项时立刻给出的短提示。 */
  hint?: string
}

export interface Mission {
  id: MissionId
  nodeId: NodeId
  title: string
  prompt: string
  kind: MissionKind
  choices?: MissionChoice[]
  /** 答对后的简短史实说明。 */
  explanation?: string
  /** 完成后新变为 available 的节点。 */
  unlocksNodeIds: NodeId[]
  exploreValue: number
}

export interface Achievement {
  id: AchievementId
  title: string
  description: string
  /** 达成条件：完成这些节点即可。 */
  requiredCompletedNodeIds: NodeId[]
}

export interface ExplorationProgress {
  exploreValue: number
  completedNodeCount: number
  totalNodeCount: number
  percent: number
}

export interface SessionState {
  started: boolean
  selectedNodeId: NodeId | null
  nodeStatusById: Record<NodeId, Exclude<import('./knowledge').NodeStatus, 'selected'>>
  completedMissionIds: MissionId[]
  unlockedAchievementIds: AchievementId[]
  exploreValue: number
}
