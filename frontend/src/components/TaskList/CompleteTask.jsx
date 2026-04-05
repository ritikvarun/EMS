import React from 'react'

const CompleteTask = ({data, onDelete}) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.title || data.taskTitle}</h2>
            <p className='text-sm mt-2'>
                {data.description || data.taskDescription}
            </p>
            <div className='mt-6 flex justify-between items-center gap-2'>
                <button className='w-full bg-green-600 rounded font-medium py-1 px-2 text-xs'>Complete</button>
                <button onClick={onDelete} className='w-full bg-gray-800 text-white rounded font-medium py-1 px-2 text-xs'>Delete</button>
            </div>
        </div>
  )
}

export default CompleteTask