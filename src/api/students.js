import { getToken } from '../helpers/local-storage'
const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

export const getStudents = async () => {
  const token = getToken()
  const response = await fetch(`${BASE_URL}/api/students`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
      method: 'GET'
    })

  const json = await response.json()
  return json.response
}