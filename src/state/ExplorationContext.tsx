import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { knowledgeService } from '@/services/knowledgeService'
import {
  clearSelection,
  completeMission,
  createInitialSession,
  getProgress,
  selectNode,
  startSession,
} from '@/services/explorationService'
import type {
  ExplorationProgress,
  KnowledgeCatalog,
  Mission,
  NodeId,
  SessionState,
} from '@/types'

interface ExplorationContextValue {
  catalog: KnowledgeCatalog
  session: SessionState
  progress: ExplorationProgress
  start: () => void
  reset: () => void
  select: (nodeId: NodeId) => void
  closeDetail: () => void
  finishMission: (mission: Mission) => void
}

const ExplorationContext = createContext<ExplorationContextValue | null>(null)

export function ExplorationProvider({ children }: { children: ReactNode }) {
  const catalog = knowledgeService.getCatalog()
  const [session, setSession] = useState<SessionState>(createInitialSession)

  const value = useMemo<ExplorationContextValue>(() => {
    return {
      catalog,
      session,
      progress: getProgress(session),
      start() {
        setSession((prev) => startSession(prev))
      },
      reset() {
        setSession(createInitialSession())
      },
      select(nodeId) {
        setSession((prev) => selectNode(prev, nodeId))
      },
      closeDetail() {
        setSession((prev) => clearSelection(prev))
      },
      finishMission(mission) {
        setSession((prev) => completeMission(prev, mission))
      },
    }
  }, [catalog, session])

  return (
    <ExplorationContext.Provider value={value}>
      {children}
    </ExplorationContext.Provider>
  )
}

export function useExploration() {
  const ctx = useContext(ExplorationContext)
  if (!ctx) {
    throw new Error('useExploration 必须在 ExplorationProvider 内使用')
  }
  return ctx
}
