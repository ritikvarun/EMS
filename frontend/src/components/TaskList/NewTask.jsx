import React from 'react'

const NewTask = ({data, onDelete, onAccept}) => {
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
            <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
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
            <div className='mt-4 flex justify-between'>
                <button onClick={onAccept} className='bg-blue-600 py-1 px-2 text-xs rounded text-white'>Accept Task</button>
                <button onClick={onDelete} className='bg-red-600 py-1 px-2 text-xs rounded text-white'>Delete</button>
            </div>
        </div>
    )
}

export default NewTask