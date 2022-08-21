const asyncHandler = require('express-async-handler')

const Employee = require('../models/employeeModel')
const User = require('../models/userModel')

// @desc    Get employess
// @route   GET /api/employee
// @access  Private
const getEmployess = asyncHandler(async (req, res) => {
  const employee = await Employee.find({ user: req.user.id })

  res.status(200).json(employee)
})

// @desc    new employee
// @route   POST /api/employee
// @access  Private
const createEmployee = asyncHandler(async (req, res) => {
  if (!req.body.firstname) {
    res.status(400)
    throw new Error('Please add a name')
  }

  const employee = await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    salary: req.body.salary,
    user: req.user.id,
  })

  res.status(200).json(employee)
})

// @desc    Update employee
// @route   PUT /api/employee/:id
// @access  Private
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Employee not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (employee.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete employee
// @route   DELETE /api/employee/:id
// @access  Private
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id)

  if (!employee) {
    res.status(400)
    throw new Error('Employee not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (employee.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await employee.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getEmployess,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
