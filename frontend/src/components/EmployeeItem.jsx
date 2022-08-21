import { useDispatch } from 'react-redux'
import { deleteEmploees } from '../features/employess/employeeSlice'

function EmployeeItem({ employee }) {
  const dispatch = useDispatch()

  return (
    <div className='employee'>
      <div>{new Date(employee.createdAt).toLocaleString('en-US')}</div>
      <h2>{employee.firstname}</h2>
      <h2>{employee.lasttname}</h2>
      <h2>{employee.age}</h2>
      <h2>{employee.salary}</h2>
      <button onClick={() => dispatch(deleteEmploees(employee._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default EmployeeItem
