import type { NodeStatus } from '@/types'

export function canOpenNode(status: NodeStatus): boolean {
  return status !== 'locked'
}

export function statusLabel(status: NodeStatus): string {
  switch (status) {
    case 'locked':
      return '未解锁'
    case 'available':
      return '可探索'
    case 'discovered':
      return '已发现'
    case 'selected':
      return '当前'
    case 'completed':
      return '已完成'
  }
}
