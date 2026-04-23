import React from 'react'

const AcceptTask = ({data, onDelete, onComplete, onFail}) => {
    const formatDate = (value) => {
        if (!value) return 'N/A'
        const parsedDate = new Date(value)
        if (Number.isNaN(parsedDate.getTime())) return value
        return parsedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    const assignedDate = formatDate(data.assignedDate)
    const deadlineDate = formatDate(data.taskDate)
  return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>Deadline: {deadlineDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.title || data.taskTitle}</h2>
            <div className='mt-2 text-xs text-gray-900'>
                <p>Given: {assignedDate}</p>
                <p>Deadline: {deadlineDate}</p>
            </div>
            <p className='text-sm mt-2'>
                {data.description || data.taskDescription}
            </p>
            <div className='flex justify-between mt-6 gap-2'>
                <button onClick={onComplete} className='bg-green-500 rounded font-medium py-1 px-2 text-xs'>Mark as Completed</button>
                <button onClick={onFail} className='bg-red-500 rounded font-medium py-1 px-2 text-xs'>Mark as Failed</button>
                <button onClick={onDelete} className='bg-gray-800 text-white rounded font-medium py-1 px-2 text-xs'>Delete</button>
            </div>
        </div>
  )
}

export default AcceptTask