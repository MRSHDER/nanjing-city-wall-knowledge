import type { Achievement } from '@/types'

export const achievements: Achievement[] = [
  {
    id: 'ach-first-step',
    title: '初识城墙',
    description: '完成「南京明城墙」探索。',
    requiredCompletedNodeIds: ['node-ming-wall'],
  },
  {
    id: 'ach-gate-system',
    title: '城门观察者',
    description: '完成城门与瓮城探索。',
    requiredCompletedNodeIds: ['node-city-gate', 'node-wengcheng'],
  },
  {
    id: 'ach-brick-reader',
    title: '铭文读者',
    description: '完成城砖与铭文探索。',
    requiredCompletedNodeIds: ['node-brick', 'node-inscription'],
  },
]
