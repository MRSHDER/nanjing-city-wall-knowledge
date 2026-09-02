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

export function completeMission(
  state: SessionState,
  mission: Mission,
): SessionState {
  if (state.completedMissionIds.includes(mission.id)) return state

  const nodeStatusById = { ...state.nodeStatusById }
  nodeStatusById[mission.nodeId] = 'completed'

  for (const id of mission.unlocksNodeIds) {
    if (nodeStatusById[id] === 'locked') {
      nodeStatusById[id] = 'available'
    }
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
