# 展陈图片接入

当前已接入仓库原有的 `public/images/liudehua-brick.jpg`，默认展示在铭文节点，支持点击放大、关闭按钮和 Escape 关闭。未新增或替换首页、地图背景。

新增照片步骤：

1. 将可使用的真实展陈照片放在 `public/images/`。
2. 在 `src/data/images.ts` 的 `exhibitImages` 中添加唯一 ID，以及 `src`、`alt`、`caption`。路径写 `images/文件名.jpg`，不要带开头斜杠；组件会处理 GitHub Pages 子路径。
3. 在 `src/data/catalog.ts` 对应节点的 `imageIds` 填入这个 ID。不要修改节点 ID、missionId 或解锁关系。
4. 运行 `npm run build`，检查该节点默认图、放大图、关闭与错误提示。

优先待补素材：城墙砖产地及运输水系展板全图（关联 `node-brick-origin` 和 `node-ming-logistics`），其次是瓮城结构实拍、城垣总览展板。当前仓库不含这些照片；任务文案引用的水系图仍需补入。不要用无关背景图冒充展板。图片说明应保留拍摄对象、来源及必要署名信息。

现有 `main` 详情仍为右侧窄面板。接入多张图片会增加页面高度，建议待左右分栏版本合并后再批量添加图片；本次不重做详情布局。
