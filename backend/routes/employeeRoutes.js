const express = require('express')
const router = express.Router()
const {
  getEmployess,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getEmployess).post(protect, createEmployee)
router.route('/:id').delete(protect, deleteEmployee).put(protect, updateEmployee)

module.exports = router
