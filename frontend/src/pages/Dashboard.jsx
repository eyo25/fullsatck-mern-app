import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeItem from '../components/EmployeeItem'
import Spinner from '../components/Spinner'
import { getEmployees, reset } from '../features/employess/employeeService'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getEmployees())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <EmployeeForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='employee'>
            {goals.map((employee) => (
              <EmployeeItem key={employee._id} employee={employee} />
            ))}
          </div>
        ) : (
          <h3>You have not created any employee</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
