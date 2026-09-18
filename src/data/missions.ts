import type { Mission } from '@/types'

/**
 * 探索任务文案：按博物馆参观的「观察 → 发现 → 判断 → 追踪」组织。
 *
 * 待补素材（本轮只预留位置，不新增图片、不使用生成图）：
 *   A 南京城墙博物馆「皇城 / 宫城」相关展陈照片          → mission-four-walls
 *   B 南京城墙博物馆「正阳门（光华门）」展板照片          → mission-city-gate
 *   C 南京城墙博物馆「城砖制作 Production of Bricks」展板 → mission-engineering（最高优先级）
 *   D 铭文城砖实拍特写                                   → mission-inscription（最高优先级）
 *   E/F《南京城墙砖产地及运输水系图》                     → mission-brick-origin / mission-ming-logistics（最高优先级，两节点共用同一张）
 *   G 城门近现代变迁 或「明故宫变迁」展板                 → mission-heritage
 *
 * 接入方式见 docs/EXHIBIT_IMAGES.md：在 data/images.ts 注册图片 ID，
 * 再给对应任务补 observation.imageId（观察型）或按该节点既有结构接入。
 */
export const missions: Mission[] = [
  {
    id: 'mission-ming-wall',
    nodeId: 'node-ming-wall',
    title: '从一座城墙开始',
    brief:
      '今天看到的南京明城墙，并不是一段孤立的城墙。沿着它继续探索，你会发现城门、防御、营造、城砖，以及藏在砖上的人与城市。',
    prompt: '接下来，我们可以从哪些线索认识南京明城墙？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '城垣格局、城门防御与筑城营造', correct: true },
      {
        id: 'b',
        label: '只需要记住它的营建年代',
        correct: false,
        hint: '年代只是起点，城墙还连着空间、工程与人的痕迹。',
      },
      {
        id: 'c',
        label: '只需要记住它有多长、有多高',
        correct: false,
        hint: '尺寸之外，还有格局、防御与营造可以继续探索。',
      },
    ],
    explanation:
      '城墙不仅是一道防御设施，也是一项庞大的城市与营造工程。沿着知识关系继续探索，我们可以从空间、工程和人的痕迹逐步认识它。',
    unlocksNodeIds: ['node-four-walls', 'node-city-gate'],
    exploreValue: 20,
  },
  // 预留照片 A：南京城墙博物馆「皇城 / 宫城」相关展陈照片。
  {
    id: 'mission-four-walls',
    nodeId: 'node-four-walls',
    title: '一座城，不止一道城墙',
    brief: '明代南京形成了多层次的城垣体系。不同城垣围合不同空间，也承担着不同功能。',
    prompt: '南京明代城垣体系包括哪些重要层次？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '宫城、皇城、京城、外郭', correct: true },
      {
        id: 'b',
        label: '内城、中城、外城、水城',
        correct: false,
        hint: '这不是明代南京城垣的通行说法。',
      },
      {
        id: 'c',
        label: '府城、县城、卫城、边城',
        correct: false,
        hint: '这些不是南京明都城的城垣层次。',
      },
    ],
    explanation:
      '从宫城、皇城到京城、外郭，南京形成了层层展开的城垣格局。理解这些空间层次，是继续认识城门与城市防御的第一步。',
    unlocksNodeIds: ['node-engineering'],
    exploreValue: 20,
  },
  // 预留照片 B：南京城墙博物馆「正阳门（光华门）」展板照片。
  {
    id: 'mission-city-gate',
    nodeId: 'node-city-gate',
    title: '从城门读懂城市',
    brief:
      '城门既是城防体系中的重要关口，也是连接城内与城外的通道。不同历史时期，城门还会随着城市交通和空间变化发生改变。',
    prompt: '从城门这一处空间，我们可以读出哪些信息？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '城市交通、防御体系与城市空间', correct: true },
      {
        id: 'b',
        label: '只有城门本身的建筑高度',
        correct: false,
        hint: '城门连接的不只是尺度，还有道路、防御与城市格局。',
      },
      {
        id: 'c',
        label: '只有今天这里的通行车流量',
        correct: false,
        hint: '一座城门记录的时间跨度，远不止今天。',
      },
    ],
    explanation:
      '一座城门连接的不只是城墙两侧。它同时记录着防御、道路、城市格局以及城市不断变化的历史。',
    unlocksNodeIds: ['node-wengcheng'],
    exploreValue: 20,
  },
  {
    id: 'mission-wengcheng',
    nodeId: 'node-wengcheng',
    title: '城门为什么不只有一道门？',
    brief:
      '进入城门，并不意味着已经突破城防。城门附近复杂的空间结构，本身就是防御体系的一部分。',
    prompt: '瓮城最核心的作用是什么？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '形成多重防御空间，加强城门区域防守', correct: true },
      {
        id: 'b',
        label: '为城门附近提供更多的市场空间',
        correct: false,
        hint: '瓮城首先是防御结构，不是为了商业空间。',
      },
      {
        id: 'c',
        label: '为城门增加一条排水通道',
        correct: false,
        hint: '排水不是设置瓮城的出发点。',
      },
    ],
    explanation:
      '瓮城把单一的城门入口转化为更复杂的防御空间。城墙的防御能力，不只来自“高”和“厚”，也来自空间结构的设计。',
    unlocksNodeIds: ['node-brick'],
    exploreValue: 20,
  },
  // 素材 C 已接入：南京城墙博物馆「城砖制作 / Production of Bricks」展板（实地调研拍摄，2026）。
  {
    id: 'mission-engineering',
    nodeId: 'node-engineering',
    title: '一块城砖是怎样做出来的？',
    brief: '筑城从材料开始。制作一块合格的城砖，首先要处理制砖所需的土。',
    prompt: '南京城墙博物馆「城砖制作」展板显示，原料处理依次经过哪几道环节？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '择土 → 熟土 → 过筛 → 暖水', correct: true },
      {
        id: 'b',
        label: '过筛 → 择土 → 暖水 → 熟土',
        correct: false,
        hint: '要先选出可用的土，之后才谈得上处理。',
      },
      {
        id: 'c',
        label: '暖水 → 熟土 → 过筛 → 择土',
        correct: false,
        hint: '选土是第一步，这一组把顺序倒过来了。',
      },
    ],
    explanation:
      '从择土、熟土、过筛到暖水，原料需要经过细致处理。不同地区的黏土成分不同，也让南京城砖呈现出不同的质地和色彩。',
    observation: {
      imageId: 'brick-production',
      prompt: '仔细观察这块展板，留意制砖用土的样貌和处理后的变化。',
      actionLabel: '点击展板图片进行观察',
      doneLabel: '✓ 已观察展板',
      findingTitle: '发现线索｜制砖用土的处理',
      findingText:
        '展板把制砖用土的处理分成几道工序，并摆出了不同土样和处理后的样品。留意它们之间的先后关系。',
    },
    unlocksNodeIds: ['node-brick'],
    exploreValue: 20,
  },
  {
    id: 'mission-brick',
    nodeId: 'node-brick',
    title: '每一块城砖都一样吗？',
    prompt: '先别急着寻找文字。仔细看看这些城砖本身，观察它们的大小、形制、质地和表面痕迹。',
    kind: 'observe',
    observation: {
      imageId: 'brick-display',
      prompt: '先别急着寻找文字。仔细看看这些城砖本身，观察它们的大小、形制、质地和表面痕迹。',
      findingTitle: '发现线索｜城砖并不完全相同',
      findingText:
        '看似相近的城砖，并不完全相同。大小、形制、质地和表面痕迹的差异，都是认识明代筑城工程的实物线索。而有些城砖，还留下了更加明确的线索——文字。',
    },
    unlocksNodeIds: ['node-inscription'],
    exploreValue: 20,
  },
  // 素材 D 已接入：铭文城砖砖面特写（实地调研拍摄，2026），替换此前的 liudehua-brick。
  // 旧素材文件 public/images/liudehua-brick.jpg 保留，便于回退。
  {
    id: 'mission-inscription',
    nodeId: 'node-inscription',
    title: '砖上的字，在告诉我们什么？',
    prompt: '从城砖铭文中，我们可能追踪到哪些信息？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '产地、人名，以及制作与责任信息', correct: true },
      {
        id: 'b',
        label: '砖窑当时的烧制温度',
        correct: false,
        hint: '铭文记录的不是窑温。',
      },
      {
        id: 'c',
        label: '这段城墙的砌筑工序',
        correct: false,
        hint: '铭文留在砖上，讲的是这块砖自己的信息。',
      },
    ],
    explanation:
      '这些文字把一块普通的建筑材料变成了可以追踪的信息载体。沿着铭文，我们不仅能寻找它从哪里来，还能继续寻找参与制作和管理的人。',
    observation: {
      imageId: 'inscribed-brick',
      prompt: '仔细观察这块有铭文的城砖。它留下的并不只是一串文字。',
      findingTitle: '发现线索｜砖面铭文',
      findingText: '砖面上的文字留下了参与生产与管理的人，是认识这项工程的重要线索。',
    },
    unlocksNodeIds: ['node-duty-chain'],
    exploreValue: 20,
  },
  {
    id: 'mission-duty-chain',
    nodeId: 'node-duty-chain',
    title: '一块砖，为什么留下这么多名字？',
    brief: '城砖铭文中的姓名和身份不是偶然留下的。它们与城砖生产、管理和质量责任有关。',
    prompt: '从府县管理人员到窑匠、造砖人夫，这些名字连起来说明了什么？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '城砖生产存在逐层可追溯的责任关系', correct: true },
      {
        id: 'b',
        label: '这些名字之间没有层级，只是随机刻写',
        correct: false,
        hint: '铭文中的身份有明确的上下层级。',
      },
      {
        id: 'c',
        label: '这些是明代之后由后人补刻上去的名字',
        correct: false,
        hint: '它们与城砖的制作和管理直接相关。',
      },
    ],
    explanation:
      '铭文让生产责任能够被追踪。一块砖背后连接着管理、组织与制作人员，这也是我们今天能够通过实物重新认识筑城工程的重要原因。',
    unlocksNodeIds: ['node-brick-origin'],
    exploreValue: 20,
  },
  // 预留照片 E（最高优先级）：《南京城墙砖产地及运输水系图》，本节点重点观察「从哪里来」。
  {
    id: 'mission-brick-origin',
    nodeId: 'node-brick-origin',
    title: '这些城砖，从哪里来？',
    brief:
      '顺着城砖上的产地信息继续追踪，会发现南京城墙的建造连接了长江中下游多个地区。',
    prompt: '从砖文中的产地信息看，南京城墙的城砖来自哪里？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '来自南京之外的多个地区', correct: true },
      {
        id: 'b',
        label: '全部在南京本地烧造',
        correct: false,
        hint: '砖文中的产地分布在南京之外。',
      },
      {
        id: 'c',
        label: '主要来自海外',
        correct: false,
        hint: '砖文记录的是国内不同地区。',
      },
    ],
    explanation:
      '一块块城砖把不同地区与南京连接起来。但新的问题也出现了：数量庞大、重量惊人的城砖，是怎样来到南京的？',
    unlocksNodeIds: ['node-ming-logistics'],
    exploreValue: 20,
  },
  // 预留照片 F（最高优先级）：与 mission-brick-origin 共用《南京城墙砖产地及运输水系图》，
  // 本节点重点观察「怎样到南京」，不需要为两关各准备一张不同的地图。
  {
    id: 'mission-ming-logistics',
    nodeId: 'node-ming-logistics',
    title: '这么重的城砖，怎样来到南京？',
    brief: '知道城砖从哪里来，还不够。下一步要沿着河流和湖泊，追踪它们前往南京的路线。',
    prompt: '为什么水路在城砖的长距离运输中如此重要？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '城砖数量大、重量高，水路适合承担大批量长距离运输', correct: true },
      {
        id: 'b',
        label: '城砖运输主要依靠人力背运，与河流无关',
        correct: false,
        hint: '大批重物更适合走水路。',
      },
      {
        id: 'c',
        label: '明初已经有铁路，可以直接把城砖运到南京',
        correct: false,
        hint: '明初还没有近代铁路。',
      },
    ],
    explanation:
      '产地与水系共同构成了一张跨区域的运输网络。城砖沿水路汇集、转运，最终来到南京，成为城墙的一部分。',
    unlocksNodeIds: ['node-heritage'],
    exploreValue: 20,
  },
  // 预留照片 G：城门近现代变迁展板，或「明故宫变迁」时间线，两者择一即可。
  {
    id: 'mission-heritage',
    nodeId: 'node-heritage',
    title: '城墙的故事，到今天结束了吗？',
    brief:
      '从城垣、城门，到营造、城砖、铭文、产地和运输，我们沿着一块块实物留下的线索重新认识了南京城墙。但城墙的历史并没有停在明代。',
    prompt: '今天我们为什么还要继续认识和保护南京城墙？',
    kind: 'choose',
    // 收束题：三项都是继续探索的方向，选任意一项都可以完成，不设置错误价值观选项。
    choices: [
      { id: 'a', label: '它仍然留在城市里，连接着今天的生活', correct: true },
      { id: 'b', label: '它还需要被继续研究和认识', correct: true },
      { id: 'c', label: '它见证的城市变化值得被保留下来', correct: true },
    ],
    explanation:
      '城市不断变化，城墙、城门以及相关遗存也经历着保存、改变与重新认识。今天对南京城墙的保护与研究，让这些跨越数百年的历史线索继续留在城市之中。从城墙出发，我们最终又回到了今天的南京。',
    unlocksNodeIds: [],
    exploreValue: 20,
  },
]
