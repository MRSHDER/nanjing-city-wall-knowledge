# 数据模型

所有知识都是静态 TypeScript 对象，运行时不写库。

## 节点状态

```
locked      未解锁，不可点
available   已解锁，尚未打开
discovered  已打开过，任务未完成
selected    当前正在看（由会话计算，不存盘）
completed   任务已完成
```

`selected` 不写入 `nodeStatusById`，避免和 `discovered` / `completed` 冲突。

## KnowledgeNode

| 字段 | 含义 |
| --- | --- |
| id | 节点 ID |
| title | 标题 |
| summary | 触控屏上的短简介 |
| content | 详情正文 |
| imageIds | 历史图片 ID，对应 assets |
| categoryId | 分类 |
| periodId | 历史时期 |
| tagIds | 标签 |
| personIds | 相关人物 |
| locationIds | 相关地点 |
| artifactIds | 相关文物 |
| relatedNodeIds | 相关节点 |
| missionId | 绑定的探索任务 |
| position | 第一阶段人工坐标 |
| startsAvailable | 开场是否可点 |

## KnowledgeRelation

| 字段 | 含义 |
| --- | --- |
| from / to | 起点和终点节点 |
| kind | contains / unlocks / located-at / related-to / built-in / made-of |
| label | 连线说明，可空 |

关系用于画线和解释结构。真正解锁以任务的 `unlocksNodeIds` 为准，避免两套规则打架。

## Mission

| 字段 | 含义 |
| --- | --- |
| nodeId | 所属节点 |
| kind | read / choose / observe |
| choices | 选择题选项 |
| unlocksNodeIds | 完成后新变为 available 的节点 |
| exploreValue | 探索值增量 |

第一阶段任务刻意简单。不要在这里做关卡编辑器。

## Achievement

`requiredCompletedNodeIds` 全部完成后解锁。没有隐藏积分公式。

## SessionState

一次游客使用期间的可变状态：

- started
- selectedNodeId
- nodeStatusById
- completedMissionIds
- unlockedAchievementIds
- exploreValue

## Mock 探索链

```
南京明城墙 → 城门 → 瓮城 → 城砖 → 城砖铭文
```

仅用于验证模型，不是完整内容。
