# 南京明城墙 · 知识交互图谱

公开仓库：https://github.com/MRSHDER/nanjing-city-wall-knowledge

面向南京城墙博物馆公共触控屏的游戏化知识探索展项。

对应 2026「智说南京人文」AI 应用征集：南京城墙博物馆｜明城墙数字活化｜城墙知识交互图谱。

本仓库是**全新独立项目**，只做架构骨架与少量 Mock，便于后续多个模型接力开发。

## 产品是什么

游客走到 1920×1080 横屏触控设备前，看到由数据生成的知识网络。点击可探索节点，阅读一条城墙知识，完成一个轻量任务，解锁相邻节点。网络逐渐展开，并给出探索进度与成就。

这不是博物馆官网，不是传统知识库，也不是 RPG。

## 技术栈

- Vite
- React 19
- TypeScript
- CSS
- SVG

无后端、无数据库、无登录、无 Redux、无 GraphQL。第一阶段不接真实大模型，但已留 `searchService` / `knowledgeService` 边界。

## 本地运行

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

产物为静态站点，适合馆内浏览器全屏打开，可离线托管。

## 文档

- [架构](docs/ARCHITECTURE.md)
- [目录说明](docs/FILE_GUIDE.md)
- [数据模型](docs/DATA_MODEL.md)
- [智能检索预留](docs/AI_INTEGRATION.md)

## 当前阶段

已完成：目录、类型、Mock 数据、服务接口、会话状态、SVG 图谱骨架、页面壳。

不要在本阶段继续做：最终视觉、复杂动画、完整知识内容、真实 LLM、VR/AR/3D、后台。
