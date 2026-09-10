import { mockRequest } from './api'
import { projectSelectionStages } from '../data/mockData'

export function getProjectSelectionStages() {
  return mockRequest(projectSelectionStages)
}

export function getProjectSelectionStage(stageId) {
  const stage = projectSelectionStages.find((item) => item.id === stageId)
  return mockRequest(stage || null)
}
