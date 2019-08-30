import request from './request'

export const getAssignments = (userId) => {
  const path = `/api/students/${userId}/assignments`
  const options = { method: 'GET' }
  return request(path, options)
}

export const createAssignment = (userId, assignment) => {
  const path = `/api/students/${userId}/assignments`
  const options = { body: assignment, method: 'POST' }
  return request(path, options)
}

export const updateAssignment = (userId, assignment) => {
  const path = `/api/students/${userId}/assignments/${assignment._id}`
  const options = { body: assignment, method: 'PUT' }
  return request(path, options)
}

export const updateGrade = (userId, assignment) => {
  const path = `/api/students/${userId}/assignments/${assignment._id}`
  const options = { body: assignment, method: 'PATCH' }
  return request(path, options)
}

export const deleteAssignment = async (userId, assignment) => {
  const path = `/api/students/${userId}/assignments/${assignment._id}`
  const options = { method: 'DELETE' }
  return request(path, options)
}

export const getUngraded = async () => {
  const path = `/api/assignments/ungraded`
  const options = { method: 'GET' }
  return request(path, options)
}

export const getGraded = async () => {
  const path = `/api/assignments/graded`
  const options = { method: 'GET' }
  return request(path, options)
}