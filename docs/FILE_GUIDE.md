# 目录说明

用直白语言说明每个目录和关键文件做什么。后续开发请先改对应层，不要把知识文本写进组件。

```
nanjing-city-wall-knowledge/
├── README.md
├── docs/
├── index.html
├── package.json
├── vite.config.ts
├── public/                 构建后可直接访问的静态文件
└── src/
```

## docs/

- `ARCHITECTURE.md`：分层、数据流、状态流
- `FILE_GUIDE.md`：本文件
- `DATA_MODEL.md`：字段含义
- `AI_INTEGRATION.md`：以后怎么接大模型

## src/types/

只放类型，不放逻辑。

- `ids.ts`：各种 ID
- `knowledge.ts`：节点、关系、分类、人物、地点、文物
- `exploration.ts`：任务、成就、会话
- `search.ts`：检索与问答结果

## src/data/

Mock 知识。以后扩内容主要改这里。

- `catalog.ts`：节点和关系
- `missions.ts`：探索任务
- `achievements.ts`：成就条件

## src/services/

纯 TypeScript，不依赖 React。

- `knowledgeService.ts`：按 ID 取知识
- `explorationService.ts`：解锁、完成任务、算进度
- `layoutService.ts`：现在返回预设坐标，以后可整文件替换
- `searchService.ts`：现在本地关键词，以后换实现

## src/state/

- `ExplorationContext.tsx`：一次游客会话。页面通过 `useExploration()` 取状态。

## src/hooks/

- `useNodeView.ts`：把节点、状态、坐标拼成图谱要用的列表。

## src/pages/

- `HomePage.tsx`：开始探索
- `ExplorePage.tsx`：图谱主界面

## src/layouts/

- `KioskLayout.tsx`：铺满 1920×1080 的外壳

## src/components/

- `knowledge-map/`：SVG 图谱、节点、连线
- `knowledge-detail/`：知识正文
- `missions/`：当前探索任务
- `exploration/`：进度条
- `achievements/`：成就列表
- `timeline/`：时期轴占位
- `common/`：大按钮等触控控件

这些组件目前是可运行的骨架，不是最终视觉。

## src/config/

- `app.ts`：展项名称、分辨率
- `touch.ts`：最小点击尺寸、字号、禁止 hover 的约定

## src/styles/

- `tokens.css`：颜色与尺寸变量
- `global.css`：触控屏全局样式

## src/assets/images/

只放真实历史素材。节点、连线、按钮、进度条一律代码生成。

## src/utils/

- `nodeStatus.ts`：状态是否可点、状态文案
