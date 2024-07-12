import api from '../api'
import type { TreeInterface } from './types'

async function getTreeList() {
  return await api.get<TreeInterface[]>('/tree/items')
}

export default {
  getTreeList
}
