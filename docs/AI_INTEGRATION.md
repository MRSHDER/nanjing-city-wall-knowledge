# 智能检索预留

第一阶段不接真实 LLM。页面只依赖 searchService 接口。

```ts
searchService.search({ text })
searchService.ask({ question, currentNodeId })
```

当前实现 localSearchService，usedLanguageModel 恒为 false。

以后新建 llmSearchService.ts 实现同一接口，再替换导出。检索结果必须落到已有 NodeId。史实以 catalog 为准。
