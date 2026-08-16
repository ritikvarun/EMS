import React, { useContext } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { AuthContext } from '../../context/AuthProvider'
import { deleteTask, updateTaskStatus } from '../../utils/localStorage'

const TaskList = ({ data, updateEmployeeData }) => {
    const [userData, setUserData] = useContext(AuthContext)

    if (!data || !data.tasks || data.tasks.length === 0) {
        return <div className='mt-16 text-center text-gray-500 font-medium'>No tasks assigned yet.</div>
    }

    const currentEmployeeId = data._id || data.id

    const handleDelete = (taskId) => {
        const result = deleteTask(taskId, currentEmployeeId)
        if (result.success) {
            setUserData(result.updatedEmployees)
            if (updateEmployeeData && result.updatedEmployee) {
                updateEmployeeData(result.updatedEmployee)
            }
        }
    }

    const handleUpdateTaskStatus = (taskId, newStatus) => {
        const result = updateTaskStatus(taskId, newStatus, currentEmployeeId)
        if (result.success) {
            setUserData(result.updatedEmployees)
            if (updateEmployeeData && result.updatedEmployee) {
                updateEmployeeData(result.updatedEmployee)
            }
        }
    }

    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {data.tasks.map((elem, idx) => {
                const taskId = elem._id || elem.id;
                if (elem.status === 'Accepted' || elem.active) {
                    return (
                        <AcceptTask 
                            key={taskId || idx} 
                            data={elem} 
                            onDelete={() => handleDelete(taskId)} 
                            onComplete={() => handleUpdateTaskStatus(taskId, 'Completed')} 
                            onFail={() => handleUpdateTaskStatus(taskId, 'Failed')} 
                        />
                    )
                }
                if (elem.status === 'New Task' || elem.newTask) {
                    return (
                        <NewTask 
                            key={taskId || idx} 
                            data={elem} 
                            onDelete={() => handleDelete(taskId)} 
                            onAccept={() => handleUpdateTaskStatus(taskId, 'Accepted')} 
                        />
                    )
                }
                if (elem.status === 'Completed' || elem.completed) {
                    return (
                        <CompleteTask 
                            key={taskId || idx} 
                            data={elem} 
                            onDelete={() => handleDelete(taskId)} 
                        />
                    )
                }
                if (elem.status === 'Failed' || elem.failed) {
                    return (
                        <FailedTask 
                            key={taskId || idx} 
                            data={elem} 
                            onDelete={() => handleDelete(taskId)} 
                        />
                    )
                }
                return null
            })}
        </div>
    )
}

export default TaskList