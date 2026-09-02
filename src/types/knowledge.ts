import type {
  ArtifactId,
  CategoryId,
  LocationId,
  MissionId,
  NodeId,
  PeriodId,
  PersonId,
  RelationId,
  TagId,
} from './ids'

/** 图谱节点生命周期。UI 必须按这五种状态分别绘制。 */
export type NodeStatus =
  | 'locked'
  | 'available'
  | 'discovered'
  | 'selected'
  | 'completed'

export interface MapPosition {
  x: number
  y: number
}

export interface KnowledgeNode {
  id: NodeId
  title: string
  summary: string
  content: string
  imageIds: string[]
  categoryId: CategoryId
  periodId: PeriodId
  tagIds: TagId[]
  personIds: PersonId[]
  locationIds: LocationId[]
  artifactIds: ArtifactId[]
  relatedNodeIds: NodeId[]
  missionId?: MissionId
  /** 第一阶段人工预设坐标。后续可由布局算法覆盖。 */
  position: MapPosition
  /** 开场即可探索的节点。 */
  startsAvailable?: boolean
}

export type RelationKind =
  | 'contains'
  | 'unlocks'
  | 'located-at'
  | 'related-to'
  | 'built-in'
  | 'made-of'

export interface KnowledgeRelation {
  id: RelationId
  from: NodeId
  to: NodeId
  kind: RelationKind
  label?: string
}

export interface Category {
  id: CategoryId
  name: string
  description: string
}

export interface HistoricalPeriod {
  id: PeriodId
  name: string
  startYear?: number
  endYear?: number
  description: string
}

export interface Person {
  id: PersonId
  name: string
  role: string
  summary: string
}

export interface Location {
  id: LocationId
  name: string
  summary: string
}

export interface Artifact {
  id: ArtifactId
  name: string
  summary: string
  imageIds: string[]
}

export interface Tag {
  id: TagId
  name: string
}

export interface KnowledgeCatalog {
  nodes: KnowledgeNode[]
  relations: KnowledgeRelation[]
  categories: Category[]
  periods: HistoricalPeriod[]
  people: Person[]
  locations: Location[]
  artifacts: Artifact[]
  tags: Tag[]
}
