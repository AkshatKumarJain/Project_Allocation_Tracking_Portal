import { mockRequest } from './api'
import { facultyMembers, facultyProjects } from '../data/mockData'

export function getFacultyMembers() {
  return mockRequest(facultyMembers)
}

export function getFacultyProjects() {
  return mockRequest(facultyProjects)
}
