import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { deleteEmployee } from '../../utils/localStorage'

const AllTask = () => {

   const [userData, setUserData] = useContext(AuthContext)

   const handleDeleteEmployee = (employeeId) => {
    if (!employeeId) return
    
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const result = deleteEmployee(employeeId)
      if (result.success) {
        setUserData(result.updatedEmployees)
      }
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
        {userData && userData.length > 0 ? (
          userData.map(function(elem, idx) {
            const employeeId = elem._id || elem.id
            return (
              <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded items-center bg-white/40'>
                <h2 className='text-lg font-medium w-1/6 text-gray-800'>{elem.name || 'Unknown'}</h2>
                <h3 className='text-lg font-medium w-1/6 text-blue-600 font-semibold'>{elem.taskCounts?.newTask || 0}</h3>
                <h5 className='text-lg font-medium w-1/6 text-yellow-600 font-semibold'>{elem.taskCounts?.active || 0}</h5>
                <h5 className='text-lg font-medium w-1/6 text-green-600 font-semibold'>{elem.taskCounts?.completed || 0}</h5>
                <h5 className='text-lg font-medium w-1/6 text-red-600 font-semibold'>{elem.taskCounts?.failed || 0}</h5>
                <div className='w-1/6 flex justify-center'>
                  <button
                    onClick={() => handleDeleteEmployee(employeeId)}
                    className='bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded shadow transition-colors'
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className='text-center py-6 text-gray-500 font-medium'>No employees registered yet.</div>
        )}
        </div>
      </div>
    </div>
  )
}

export default AllTask