import { mockRequest } from './api'
import { projectBankItems } from '../data/mockData'

export function getProjectBankItems() {
  return mockRequest(projectBankItems)
}
