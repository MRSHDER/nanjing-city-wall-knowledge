import type { Mission } from '@/types'

export const missions: Mission[] = [
  {
    id: 'mission-ming-wall',
    nodeId: 'node-ming-wall',
    title: '认识城墙',
    prompt: '南京明城墙主要建于哪个时期？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '明洪武年间大规模修筑', correct: true },
      { id: 'b', label: '清代中期一次性建成', correct: false },
    ],
    unlocksNodeIds: ['node-city-gate'],
    exploreValue: 20,
  },
  {
    id: 'mission-city-gate',
    nodeId: 'node-city-gate',
    title: '走进城门',
    prompt: '城门在防御体系中的主要作用是什么？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '只作装饰门楼', correct: false },
      { id: 'b', label: '控制出入并重点设防', correct: true },
    ],
    unlocksNodeIds: ['node-wengcheng'],
    exploreValue: 20,
  },
  {
    id: 'mission-wengcheng',
    nodeId: 'node-wengcheng',
    title: '观察瓮城',
    prompt: '请阅读瓮城简介。',
    kind: 'read',
    unlocksNodeIds: ['node-brick'],
    exploreValue: 20,
  },
  {
    id: 'mission-brick',
    nodeId: 'node-brick',
    title: '发现城砖',
    prompt: '城砖为什么能成为研究材料？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '砖上常有产地与责任铭文', correct: true },
      { id: 'b', label: '每块砖都绘有彩色图案', correct: false },
    ],
    unlocksNodeIds: ['node-inscription'],
    exploreValue: 20,
  },
  {
    id: 'mission-inscription',
    nodeId: 'node-inscription',
    title: '读铭文',
    prompt: '铭文最常记录的信息是？',
    kind: 'choose',
    choices: [
      { id: 'a', label: '府州县产地与责任人', correct: true },
      { id: 'b', label: '现代修复施工编号', correct: false },
    ],
    unlocksNodeIds: [],
    exploreValue: 20,
  },
]
