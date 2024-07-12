import api from '../api'
import type { TableInterface } from './types'

async function getTableList() {
  return await api.get<TableInterface[]>('/tree/items')
}

export default {
  getTableList
}
