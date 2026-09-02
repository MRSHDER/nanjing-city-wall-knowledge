# 智能检索预留

第一阶段不接真实 LLM。页面只依赖 `searchService` 接口，不依赖某个厂商 SDK。

## 目标能力（以后）

游客可能说：

- 「南京城墙为什么这么坚固？」
- 「我想知道城砖是怎么做的。」

期望管线：

```
自然语言
  → 意图识别
  → 知识节点检索
  → 定位节点 / 推荐探索路径
```

## 现有边界

```ts
searchService.search({ text })
searchService.ask({ question, currentNodeId })
```

当前实现：`localSearchService`，对标题和正文做关键词打分，`usedLanguageModel` 恒为 `false`。

## 以后怎么换

1. 新建例如 `src/services/llmSearchService.ts`，实现同一个 `SearchService`。
2. 在 `src/services/searchService.ts` 把导出的 `searchService` 换成新实现。
3. 不要改 `ExplorePage` 的调用方式。
4. 密钥与端点放到构建时环境变量，不要写进仓库。馆内若无外网，保留本地检索作为回退。

## 不要破坏的约定

- 检索结果必须落到已有 `NodeId`，不要让模型凭空发明节点。
- 推荐路径只能使用 `available` / `discovered` / `completed` 节点，或先走探索规则解锁。
- 问答文案可以生成，但史实仍以 `catalog` 为准。
- 公共屏输入若使用屏幕键盘，组件放 `components/common`，不要为 AI 单独引入路由或后端。

## knowledgeService 的角色

`knowledgeService` 继续做结构化查询。LLM 需要上下文时，由 search 实现调用 `getNode` / `getRelationsOf` 组装提示词。不要让模型直接改 `SessionState`。
