# 展陈图片接入

当前已接入的真实照片（均为**南京城墙博物馆实地调研拍摄，2026**，经非生成式摄影后期，不含 AI 生成内容）：

| 图片 ID | 文件 | 用途节点 |
| --- | --- | --- |
| `brick-production` | `public/images/brick-production.jpg` | 筑城营造 / `mission-engineering`（展板观察） |
| `inscribed-brick` | `public/images/inscribed-brick.jpg` | 城砖铭文 / `mission-inscription`（砖面观察） |
| `brick-display` | `public/images/brick-display.jpg` | 城砖 / `mission-brick`（群像观察） |
| `imperial-city` | `public/images/imperial-city.jpg` | 四重城垣 / `node-four-walls`（图文说明） |
| `zhengyang-gate` | `public/images/zhengyang-gate.jpg` | 城门 / `node-city-gate`（图文说明） |
| `gate-modern-changes` | `public/images/gate-modern-changes.jpg` | 城墙与今天 / `node-heritage`（图文说明） |
| `brick-origin-map` | `public/images/brick-origin-map.jpg` | 城砖产地 / `mission-brick-origin`（点击地图观察） |
| `liudehua-brick` | `public/images/liudehua-brick.jpg` | 已被 `inscribed-brick` 替换，**文件保留以便回退**，当前无节点引用 |

照片只做等比缩放与色彩处理，展示时使用 `object-fit: contain`，不裁切展板文字或砖面铭文主体。

## 新增照片步骤

1. 将可使用的真实展陈照片放在 `public/images/`。
2. 在 `src/data/images.ts` 的 `exhibitImages` 中添加唯一 ID，以及 `src`、`alt`、`caption`。路径写 `images/文件名.jpg`，不要带开头斜杠；组件会处理 GitHub Pages 子路径。
3. 按用途接入对应节点：
   - 观察型任务（点击图片观察 → 反馈 → 才能继续）：在 `src/data/missions.ts` 对应任务的 `observation.imageId` 填写该 ID。
   - 图文说明型：在 `src/data/catalog.ts` 对应节点的 `imageIds` 填入该 ID。
   两种情况都不要修改节点 ID、missionId 或解锁关系。
4. 运行 `npm run build`，检查该节点默认图、放大图、关闭与错误提示。

## 待补素材清单（截至本轮）

| 编号 | 素材 | 关联任务 | 状态 | 接入方式 |
| --- | --- | --- | --- | --- |
| A | 南京城墙博物馆「皇城 / 宫城」相关展陈照片 | `mission-four-walls`（四重城垣） | **已补充**（`imperial-city`，实地调研拍摄，2026） | 已作为该节点知识说明的一部分接入 `catalog.ts` 的 `imageIds` |
| B | 南京城墙博物馆「正阳门（光华门）」展板照片 | `mission-city-gate`（城门） | **已补充**（`zhengyang-gate`，实地调研拍摄，2026） | 已接入 `catalog.ts` 的 `imageIds`；后续若要改成"点击观察"任务，再移入 `observation.imageId` |
| C | 「城砖制作 / Production of Bricks」展板 | `mission-engineering`（筑城营造） | **已补充**（`brick-production`，实地调研拍摄，2026） | 已作为该任务的主要观察图片，接入 `observation.imageId` |
| D | 铭文城砖砖面特写 | `mission-inscription`（城砖铭文） | **已补充**（`inscribed-brick`，实地调研拍摄，2026） | 已替换旧的 `liudehua-brick`，旧文件保留 |
| E | 《南京城墙砖产地及运输水系图》 | `mission-brick-origin`（城砖产地） | **已补充**（`brick-origin-map`，实地调研拍摄，2026） | 观察重点是「从哪里来」 |
| F | 同 E 的《南京城墙砖产地及运输水系图》 | `mission-ming-logistics`（大明物流） | **该节点已取消图片观察** | 不再重复看图：同一张图已在「城砖产地」观察过，大明物流改为直接作答（图仍由 E 使用） |
| G | 城门近现代变迁展板（武定门 / 雨花门 / 中华东门）**或**「明故宫变迁」时间线 | `mission-heritage`（城墙与今天） | **已补充**（`gate-modern-changes`，实地调研拍摄，2026，采用"城门近现代变迁"方案） | 已接入 `catalog.ts` 的 `imageIds`；「明故宫变迁」备选见下 |

备选与暂未使用的调研照片（都在 `D:\我的画` 原始素材中，未入库）：

- 「明故宫变迁 / The Transition Of The Forbidden City Of Nanjing」时间线展板（`museum_ABG_candidate_05_full.jpg`，竖幅，只有 full 版没有 16:9 版）——G 的另一方案，本轮未采用。
- `museum_ABG_candidate_01`（展柜出土工具）、`museum_ABG_candidate_06`（碑拓与兵器）——不属于 A–G 清单，未接入。

说明：

- **A–G 全部素材已到位**，无待补项。
- 地图类素材为馆方展板实拍，未使用 AI 生成历史地图，也未上网抓取未经授权的历史地图。
- 接入图片时，`alt` 与 `caption` 应保留拍摄对象、来源及必要署名信息。

## 版本约束

现有详情面板为右侧窄面板，接入多张图片会增加页面高度。面板内部已支持纵向滚动（标题区固定），但同一节点的图片仍建议控制在 1–2 张，避免把任务推到屏幕很远之外。展板类宽幅照片在窄面板中会等比缩小，细节文字以现场展板为准，页面内不裁切。
