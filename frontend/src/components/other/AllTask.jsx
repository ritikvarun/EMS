import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { BASE_URL } from '../../utils/apiConfig'

const AllTask = () => {

   const [userData,setUserData] =  useContext(AuthContext)

   const handleDeleteEmployee = async (employeeId) => {
    if (!employeeId) return

    try {
      let resp = await fetch(`${BASE_URL}/api/users/${employeeId}`, {
        method: 'DELETE',
      })

      // Backward-compatible fallback for deployments using alternate route shape
      if (resp.status === 404) {
        resp = await fetch(`${BASE_URL}/api/users/delete/${employeeId}`, {
          method: 'DELETE',
        })
      }

      if (!resp.ok) {
        console.error('Failed to delete employee')
        return
      }

      setUserData((prev) => (prev || []).filter((emp) => (emp._id || emp.id) !== employeeId))
    } catch (error) {
      console.error(error)
    }
   }

   
  return (
    <div className='bg-white/60 backdrop-blur-lg p-5 rounded-2xl mt-5 shadow-lg border border-white/50'>
      <div className='overflow-x-auto'>
        <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded text-white min-w-[760px]'>
            <h2 className='text-lg font-medium w-1/6'>Employee Name</h2>
            <h3 className='text-lg font-medium w-1/6'>New Task</h3>
            <h5 className='text-lg font-medium w-1/6'>Active Task</h5>
            <h5 className='text-lg font-medium w-1/6'>Completed</h5>
            <h5 className='text-lg font-medium w-1/6'>Failed</h5>
            <h5 className='text-lg font-medium w-1/6 text-center'>Action</h5>
        </div>
        <div className='min-w-[760px]'>
        {userData && userData.map(function(elem,idx){
            const employeeId = elem._id || elem.id
            return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded items-center'>
            <h2 className='text-lg font-medium  w-1/6 text-gray-800'>{elem.name || 'Unknown'}</h2>
            <h3 className='text-lg font-medium w-1/6 text-blue-600'>{elem.taskCounts?.newTask || 0}</h3>
            <h5 className='text-lg font-medium w-1/6 text-yellow-600'>{elem.taskCounts?.active || 0}</h5>
            <h5 className='text-lg font-medium w-1/6 text-green-600'>{elem.taskCounts?.completed || 0}</h5>
            <h5 className='text-lg font-medium w-1/6 text-red-600'>{elem.taskCounts?.failed || 0}</h5>
            <div className='w-1/6 flex justify-center'>
              <button
                onClick={() => handleDeleteEmployee(employeeId)}
                className='bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded'
              >
                Delete
              </button>
            </div>
        </div>
        })}
        </div>
      </div>
    </div>
  )
}

export default AllTask