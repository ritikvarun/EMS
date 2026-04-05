import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {

   const [userData,setUserData] =  useContext(AuthContext)

   
  return (
    <div className='bg-white/60 backdrop-blur-lg p-5 rounded-2xl mt-5 shadow-lg border border-white/50'>
      <div className='overflow-x-auto'>
        <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded text-white min-w-[600px]'>
            <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
            <h3 className='text-lg font-medium w-1/5'>New Task</h3>
            <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
            <h5 className='text-lg font-medium w-1/5'>Completed</h5>
            <h5 className='text-lg font-medium w-1/5'>Failed</h5>
        </div>
        <div className='min-w-[600px]'>
        {userData && userData.map(function(elem,idx){
            return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded items-center'>
            <h2 className='text-lg font-medium  w-1/5 text-gray-800'>{elem.name || 'Unknown'}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-600'>{elem.taskCounts?.newTask || 0}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-600'>{elem.taskCounts?.active || 0}</h5>
            <h5 className='text-lg font-medium w-1/5 text-green-600'>{elem.taskCounts?.completed || 0}</h5>
            <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskCounts?.failed || 0}</h5>
        </div>
        })}
        </div>
      </div>
    </div>
  )
}

export default AllTask