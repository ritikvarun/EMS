import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import CreateUser from '../other/CreateUser'

const AdminDashboard = (props) => {
    return (
        <div className='min-h-screen w-full p-4 sm:p-7'>
            <Header changeUser={props.changeUser} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div>
                    <CreateTask />
                </div>
                <div>
                    <CreateUser />
                </div>
            </div>
            <AllTask />
        </div>
    )
}

export default AdminDashboard