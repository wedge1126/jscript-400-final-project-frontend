import request from './request'
import { getToken } from '../helpers/local-storage'
const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

export const getAssignments = (userId) => {
  const path = `/api/students/${userId}/assignments`
  const options = { method: 'GET' }
  return request(path, options)
}

export const deleteAssignment = async (userId, post) => {
  const token = getToken()
  const response = await fetch(`${BASE_URL}/api/users/${userId}/posts/${post._id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE'
  })
  const json = await response.json()

  return json
}

export const createAssignment = (userId, post) => {
  const path = `/api/students/${userId}/assignments`
  const options = { body: post, method: 'POST' }
  return request(path, options)
}

export const updateAssignment = (userId, post) => {
  const path = `/api/users/${userId}/posts/${post._id}`
  const options = { body: post, method: 'PUT' }
  return request(path, options)
}