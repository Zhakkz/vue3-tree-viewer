import type { TreeInterface } from '@/services/tree-service/types'

export interface TreeNode extends TreeInterface {
  children: TreeNode[]
}
export function buildTree(items: TreeInterface[]): TreeNode[] {
  const map = new Map<string, TreeNode>()
  const roots: TreeNode[] = []

  items.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })

  items.forEach((item) => {
    if (item.parent_id === null) {
      roots.push(map.get(item.id)!)
    } else {
      const parent = map.get(item.parent_id)
      if (parent) {
        parent.children!.push(map.get(item.id)!)
      }
    }
  })
  console.log(roots)

  return roots
}
