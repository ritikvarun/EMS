import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { createTask } from '../../utils/localStorage'

const CreateTask = () => {

    const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const todayDate = new Date().toISOString().split('T')[0]
    const [assignedDate, setAssignedDate] = useState(todayDate)
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (!userData || userData.length === 0) {
            alert("No employees available to assign task")
            return
        }

        // Find user by name to get id
        const employee = userData.find(emp => emp.name.toLowerCase() === asignTo.trim().toLowerCase())
        if (!employee) {
            alert("No employee found with this name")
            return
        }

        const taskData = {
            title: taskTitle,
            description: taskDescription,
            assignedDate: assignedDate,
            taskDate: taskDate,
            category: category,
            assignedTo: employee._id || employee.id,
        }

        const result = createTask(taskData)

        if (result.success) {
            // Reset form
            setTaskTitle('')
            setCategory('')
            setAsignTo('')
            setAssignedDate(todayDate)
            setTaskDate('')
            setTaskDescription('')
            
            // Update global context state
            setUserData(result.updatedEmployees)
            alert("Task Created Successfully!")
        } else {
            alert(result.message || "Failed to create task")
        }
    }

    return (
        <div className='p-5 bg-white/60 backdrop-blur-lg mt-5 rounded-2xl shadow-lg border border-white/50'>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}
                className='flex flex-col md:flex-row flex-wrap w-full items-start justify-between'
            >
                <div className='w-full md:w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-600 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            required
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-600 mb-0.5'>Task Given Date</h3>
                        <input
                            value={assignedDate}
                            onChange={(e) => {
                                setAssignedDate(e.target.value)
                            }}
                            required
                            max={taskDate || undefined}
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-600 mb-0.5'>Deadline Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            required
                            min={assignedDate || todayDate}
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-600 mb-0.5'>Asign to</h3>
                        <input
                            value={asignTo}
                            onChange={(e) => {
                                setAsignTo(e.target.value)
                            }}
                            required
                            list="employee-names"
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='employee name' />
                        <datalist id="employee-names">
                            {userData && userData.map((emp, idx) => (
                                <option key={idx} value={emp.name} />
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-600 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            required
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc' />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-600 mb-0.5'>Task Status</h3>
                        <input
                            value="New Task"
                            readOnly
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-gray-100 border-[1px] border-gray-400 mb-4'
                            type="text"
                        />
                    </div>
                </div>

                <div className='w-full md:w-2/5 flex flex-col items-start mt-4 md:mt-0'>
                    <h3 className='text-sm text-gray-600 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} required className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' name="" id=""></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full text-white font-medium shadow-sm transition-colors'>Create Task</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask