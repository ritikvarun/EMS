import React, { useContext } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { AuthContext } from '../../context/AuthProvider'

const TaskList = ({ data, updateEmployeeData }) => {
    const [userData, setUserData] = useContext(AuthContext)

    if (!data || !data.tasks) {
        return <div className='mt-16 text-center text-gray-500'>No tasks found.</div>
    }

    const refreshData = async () => {
        // Refresh global AuthContext (Admin list)
        const globalResp = await fetch('http://localhost:5000/api/users')
        const globalData = await globalResp.json()
        setUserData(globalData)

        // Refresh current employee dashboard data
        const currentUserId = data.id || data._id;
        const userResp = await fetch(`http://localhost:5000/api/users/${currentUserId}`); // Needs to be fixed or updated
        // Actually, fetching from our new /api/users and finding the current one is better
        const currentEmp = globalData.find(e => e._id === currentUserId || e.id === currentUserId)
        if (currentEmp) {
            updateEmployeeData(currentEmp)
        }
    }

    const handleDelete = async (id) => {
        try {
            const resp = await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' })
            if (resp.ok) {
                refreshData()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleUpdateTaskStatus = async (id, newStatus) => {
        try {
            const resp = await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            if (resp.ok) {
                refreshData()
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {data.tasks.map((elem, idx) => {
                const id = elem._id;
                if (elem.status === 'Accepted' || elem.active) {
                    return <AcceptTask key={idx} data={elem} onDelete={() => handleDelete(id)} onComplete={() => handleUpdateTaskStatus(id, 'Completed')} onFail={() => handleUpdateTaskStatus(id, 'Failed')} />
                }
                if (elem.status === 'New Task' || elem.newTask) {
                    return <NewTask key={idx} data={elem} onDelete={() => handleDelete(id)} onAccept={() => handleUpdateTaskStatus(id, 'Accepted')} />
                }
                if (elem.status === 'Completed' || elem.completed) {
                    return <CompleteTask key={idx} data={elem} onDelete={() => handleDelete(id)} />
                }
                if (elem.status === 'Failed' || elem.failed) {
                    return <FailedTask key={idx} data={elem} onDelete={() => handleDelete(id)} />
                }
                return null
            })}
        </div>
    )
}

export default TaskList