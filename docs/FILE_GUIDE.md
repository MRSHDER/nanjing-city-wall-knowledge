# 目录说明

用直白语言说明每个目录和关键文件做什么。后续开发请先改对应层，不要把知识文本写进组件。

## docs/

- ARCHITECTURE.md：分层、数据流、状态流
- FILE_GUIDE.md：本文件
- DATA_MODEL.md：字段含义
- AI_INTEGRATION.md：以后怎么接大模型

## src/types/

只放类型。ids / knowledge / exploration / search。

## src/data/

Mock 知识。catalog / missions / achievements。

## src/services/

纯 TypeScript，不依赖 React。knowledgeService / explorationService / layoutService / searchService。

## src/state/

ExplorationContext.tsx：一次游客会话。

## src/hooks/

useNodeView.ts：节点、状态、坐标。

## src/pages/

HomePage / ExplorePage

## src/layouts/

KioskLayout：铺满 1920×1080

## src/components/

knowledge-map / knowledge-detail / missions / exploration / achievements / timeline / common

## src/config/

app.ts 与 touch.ts

## src/styles/

tokens.css 与 global.css

## src/assets/images/

只放真实历史素材。
