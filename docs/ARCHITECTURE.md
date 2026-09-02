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
