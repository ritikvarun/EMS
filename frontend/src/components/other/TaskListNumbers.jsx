import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='flex mt-10 justify-between gap-5 flex-wrap w-full'>
        
        <div className='rounded-xl w-full sm:w-[48%] lg:w-[22%] py-6 px-9 bg-blue-400 cursor-pointer hover:bg-blue-500 active:scale-95 transition-all text-gray-900 flex justify-between items-center shadow-sm'>
            <div>
              <h2 className='text-3xl font-bold'>{data?.taskCounts?.newTask || 0}</h2>
              <h3 className='text-xl mt-0.5 font-medium'>New Task</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 opacity-80">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div className='rounded-xl w-full sm:w-[48%] lg:w-[22%] py-6 px-9 bg-green-400 cursor-pointer hover:bg-green-500 active:scale-95 transition-all text-gray-900 flex justify-between items-center shadow-sm'>
            <div>
              <h2 className='text-3xl font-bold'>{data?.taskCounts?.completed || 0}</h2>
              <h3 className='text-xl mt-0.5 font-medium'>Completed</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 opacity-80">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div className='rounded-xl w-full sm:w-[48%] lg:w-[22%] py-6 px-9 bg-yellow-400 cursor-pointer hover:bg-yellow-500 active:scale-95 transition-all text-gray-900 flex justify-between items-center shadow-sm'>
            <div>
              <h2 className='text-3xl font-bold'>{data?.taskCounts?.active || 0}</h2>
              <h3 className='text-xl mt-0.5 font-medium'>Accepted</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 opacity-80">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        </div>
        <div className='rounded-xl w-full sm:w-[48%] lg:w-[22%] py-6 px-9 bg-red-400 cursor-pointer hover:bg-red-500 active:scale-95 transition-all text-gray-900 flex justify-between items-center shadow-sm'>
            <div>
              <h2 className='text-3xl font-bold'>{data?.taskCounts?.failed || 0}</h2>
              <h3 className='text-xl mt-0.5 font-medium'>Failed</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 opacity-80">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        
    </div>
  )
}

export default TaskListNumbers