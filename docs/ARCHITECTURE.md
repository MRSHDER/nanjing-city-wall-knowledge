# 架构说明

## 目标环境

公共触控屏，横屏 1920×1080，浏览器运行，手指点击，无键盘依赖，无 hover / 右键，无账号，单次游客会话。交互热区与字号按站立操作设计。

## 分层

```
pages / layouts
        ↓
components（图谱、详情、任务、进度、成就、时间轴）
        ↓
hooks + state（ExplorationContext）
        ↓
services（knowledge / exploration / layout / search）
        ↓
data（catalog / missions / achievements）
        ↓
types
```

数据和 UI 分离。页面不直接读写 JSON 结构以外的业务规则。解锁、进度、成就都走 `explorationService`。

## 页面流

```
HomePage（开始探索）
    ↓
ExplorePage
    ├── KnowledgeMap（SVG 节点 + 连线）
    ├── KnowledgeDetail
    │     └── MissionPanel
    ├── ProgressBar
    ├── TimelineRail
    └── AchievementList
```

`session.started` 决定首页还是主界面。`session.selectedNodeId` 决定是否打开详情。不引入路由库，减少触控屏与离线复杂度。

## 数据流

1. `knowledgeService.getCatalog()` 读静态数据。
2. `createInitialSession()` 把 `startsAvailable` 的节点标为 `available`，其余 `locked`。
3. 点击节点 → `selectNode`：`available` 变为 `discovered`，并设为 `selected`。
4. 完成任务 → `completeMission`：当前节点 `completed`，`unlocksNodeIds` 中仍 `locked` 的变为 `available`，累加探索值，检查成就。
5. 图谱根据 `nodeStatusById` + `selectedNodeId` 绘制五种 UI 状态。

## 状态流

会话状态只存在内存里（`SESSION.persist = false`）。点「重新开始」或刷新页面即回到空会话，适合下一组游客。

不要上 Redux。状态形状见 `SessionState`，变更函数都是纯函数，便于测试和接力开发。

## 知识图谱

节点与关系是数据。`KnowledgeMap` 用 SVG 根据 `layoutService` 给出的坐标画圆和线。

第一阶段布局 = 节点上的人工 `position`。替换算法时只改 `src/services/layoutService.ts`。

连线在两端都仍 `locked` 时不显示，避免游客看到整张未解锁网。

## 探索系统

轻量规则：

- 探索值：完成任务累加 `mission.exploreValue`
- 进度：`completed` 节点数 / 总节点数
- 成就：所需节点均 `completed` 即解锁
- 解锁：任务字段 `unlocksNodeIds`

没有战斗、等级、背包、货币。

## 模块关系

| 模块 | 职责 | 依赖 |
| --- | --- | --- |
| `data` | 静态知识 | `types` |
| `knowledgeService` | 查询目录 | `data` |
| `explorationService` | 会话规则 | `data` |
| `layoutService` | 坐标 | `types` |
| `searchService` | 检索 / 问答边界 | `data` |
| `ExplorationContext` | 把规则接到 React | services |
| `useNodeView` | 节点状态 + 坐标给 UI | context + services |
| `KnowledgeMap` | 画图谱 | hook |

## 离线

构建后全是静态文件。图片放 `src/assets/images` 或 `public`。检索第一阶段不访问网络。
