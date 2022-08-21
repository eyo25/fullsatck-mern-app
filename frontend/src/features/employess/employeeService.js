import axios from 'axios'

const API_URL = '/api/employees/'

// Create new goal
const createEmployees = async (employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, employeeData, config)

  return response.data
}

// Get user goals
const getEmployee = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user goal
const deleteEmploee = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + goalId, config)

  return response.data
}

const goalService = {
  createEmployees,
  getEmployee,
  deleteEmploee,
}

export default employeeService
