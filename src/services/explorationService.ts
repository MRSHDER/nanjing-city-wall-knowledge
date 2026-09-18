import { catalog, achievements } from '@/data'
import type {
  AchievementId,
  ExplorationProgress,
  Mission,
  NodeId,
  SessionState,
} from '@/types'

export function createInitialSession(): SessionState {
  const nodeStatusById: SessionState['nodeStatusById'] = {}

  for (const node of catalog.nodes) {
    nodeStatusById[node.id] = node.startsAvailable ? 'available' : 'locked'
  }

  return {
    started: false,
    selectedNodeId: null,
    nodeStatusById,
    completedMissionIds: [],
    unlockedAchievementIds: [],
    exploreValue: 0,
  }
}

export function startSession(state: SessionState): SessionState {
  return { ...state, started: true }
}

export function selectNode(state: SessionState, nodeId: NodeId): SessionState {
  const status = state.nodeStatusById[nodeId]
  if (!status || status === 'locked') return state

  const nextStatus = { ...state.nodeStatusById }
  if (status === 'available') {
    nextStatus[nodeId] = 'discovered'
  }

  return {
    ...state,
    selectedNodeId: nodeId,
    nodeStatusById: nextStatus,
  }
}

export function clearSelection(state: SessionState): SessionState {
  return { ...state, selectedNodeId: null }
}

/**
 * 最终节点：整个探索的唯一收束点。
 * 它不随任何单个任务解锁，只有其余节点全部 completed 后才会变为 available。
 * 关系边（如「今日传承」「历史留下的声音」）只是知识/叙事连线，不参与解锁判断。
 */
const FINAL_NODE_ID: NodeId = 'node-heritage'

/** 除最终节点外，其余节点是否都已 completed。 */
function isFinalNodeUnlockable(
  nodeStatusById: SessionState['nodeStatusById'],
): boolean {
  return catalog.nodes.every(
    (node) => node.id === FINAL_NODE_ID || nodeStatusById[node.id] === 'completed',
  )
}

export function completeMission(
  state: SessionState,
  mission: Mission,
): SessionState {
  if (state.completedMissionIds.includes(mission.id)) return state

  const nodeStatusById = { ...state.nodeStatusById }
  nodeStatusById[mission.nodeId] = 'completed'

  for (const id of mission.unlocksNodeIds) {
    // 最终节点跳过常规解锁，只由下面的最终门控判断。
    if (id === FINAL_NODE_ID) continue
    if (nodeStatusById[id] === 'locked') {
      nodeStatusById[id] = 'available'
    }
  }

  // 最终门控：其余 10 个节点全部完成，城墙与今天才从 locked 变为 available。
  if (
    nodeStatusById[FINAL_NODE_ID] === 'locked' &&
    isFinalNodeUnlockable(nodeStatusById)
  ) {
    nodeStatusById[FINAL_NODE_ID] = 'available'
  }

  const completedMissionIds = [...state.completedMissionIds, mission.id]
  const completedNodeIds = catalog.nodes
    .filter((node) => nodeStatusById[node.id] === 'completed')
    .map((node) => node.id)

  const unlockedAchievementIds = achievements
    .filter((item) =>
      item.requiredCompletedNodeIds.every((id) => completedNodeIds.includes(id)),
    )
    .map((item) => item.id)

  return {
    ...state,
    nodeStatusById,
    completedMissionIds,
    unlockedAchievementIds,
    exploreValue: state.exploreValue + mission.exploreValue,
    selectedNodeId: mission.nodeId,
  }
}

export function getProgress(state: SessionState): ExplorationProgress {
  const totalNodeCount = catalog.nodes.length
  const completedNodeCount = Object.values(state.nodeStatusById).filter(
    (status) => status === 'completed',
  ).length

  return {
    exploreValue: state.exploreValue,
    completedNodeCount,
    totalNodeCount,
    percent: totalNodeCount === 0 ? 0 : completedNodeCount / totalNodeCount,
  }
}

export function latestAchievementId(
  prev: SessionState,
  next: SessionState,
): AchievementId | null {
  return (
    next.unlockedAchievementIds.find(
      (id) => !prev.unlockedAchievementIds.includes(id),
    ) ?? null
  )
}
