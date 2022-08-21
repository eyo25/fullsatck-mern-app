const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    firstname: {
      type: String,
      required: [true, 'Please add a  firstname'],
    },
    lastname: {
      type: String,
      required: [true, 'Please add a lastname'],
    },
    age: {
      type: Number,
      required: [true, 'Please add your age'],
    },
    salary: {
      type: Number,
      required: [true, 'Please add salary'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Employee', employeeSchema)
