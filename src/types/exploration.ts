import type { AchievementId, MissionId, NodeId } from './ids'

export type MissionKind = 'read' | 'choose' | 'observe' | 'reflect'

export interface MissionChoice {
  id: string
  label: string
  correct: boolean
  /** 点到错误选项时立刻给出的短提示。 */
  hint?: string
}

/** 图片观察任务的素材与文案；有该字段的任务必须先完成观察，才会显示后续内容。 */
export interface MissionObservation {
  /** 观察素材，对应 data/images.ts 中的 ID。 */
  imageId: string
  /** 观察提示语。 */
  prompt: string
  /** 未观察时图片下方的操作提示，默认「点击城砖图片进行观察」。 */
  actionLabel?: string
  /** 已观察后图片下方的状态文字，默认「✓ 已观察砖面」。 */
  doneLabel?: string
  /** 完成观察后的发现反馈标题。 */
  findingTitle: string
  /** 完成观察后的发现反馈正文。 */
  findingText: string
}

/** 收束用的开放思考任务：不设选项、无对错，展开参考思考即视为完成本题。 */
export interface MissionReflection {
  /** 引导用户自己想的第二句提示，显示在问题之后。 */
  invitation: string
  /** 展开按钮文案，默认「查看参考思考」。 */
  actionLabel?: string
  /** 展开后的完成状态文案，默认「✓ 探索完成」。 */
  doneLabel?: string
  /** 展开后显示的参考思考段落。 */
  paragraphs: string[]
}

export interface Mission {
  id: MissionId
  nodeId: NodeId
  title: string
  /** 参观引导：说明这一步要观察或思考什么，显示在问题之前。 */
  brief?: string
  prompt: string
  kind: MissionKind
  choices?: MissionChoice[]
  /** 答对后的简短史实说明。 */
  explanation?: string
  /** 图片观察配置；存在时该任务先观察后作答。 */
  observation?: MissionObservation
  /** 开放思考配置（kind 为 reflect 时使用）。 */
  reflection?: MissionReflection
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
