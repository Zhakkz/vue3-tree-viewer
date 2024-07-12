import api from '../api'
import type { APIResponse } from '../types'
import type { TableInterface } from './types'

async function getTableList() {
  return await api.get<APIResponse<TableInterface[]>>('school')
}

export default {
  getTableList
}
