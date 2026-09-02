# 数据模型

所有知识都是静态 TypeScript 对象。

## 节点状态

locked / available / discovered / selected / completed

selected 不写入 nodeStatusById。

## KnowledgeNode

id, title, summary, content, imageIds, categoryId, periodId, tagIds, personIds, locationIds, artifactIds, relatedNodeIds, missionId, position, startsAvailable

## KnowledgeRelation

from, to, kind, label

kind: contains / unlocks / located-at / related-to / built-in / made-of

真正解锁以任务 unlocksNodeIds 为准。

## Mission

nodeId, kind(read/choose/observe), choices, unlocksNodeIds, exploreValue

## Achievement

requiredCompletedNodeIds 全部完成后解锁。

## SessionState

started, selectedNodeId, nodeStatusById, completedMissionIds, unlockedAchievementIds, exploreValue

## Mock 探索链

南京明城墙 → 城门 → 瓮城 → 城砖 → 城砖铭文
