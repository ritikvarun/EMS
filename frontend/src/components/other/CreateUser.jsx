import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { BASE_URL } from '../../utils/apiConfig'

const CreateUser = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Employee')

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, role })
            })

            const data = await response.json()

            if (response.ok) {
                setName('')
                setEmail('')
                setPassword('')
                
                // Refresh global context
                const globalResp = await fetch(`${BASE_URL}/api/users`)
                const globalData = await globalResp.json()
                setUserData(globalData)
            } else {
                alert(data.message || 'Failed to create user')
            }
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        }
    }

    return (
        <div className='p-5 bg-white/20 backdrop-blur-md mt-5 rounded'>
            <h2 className='text-xl font-semibold mb-4 text-slate-800'>Create New User (Employee/Admin)</h2>
            <form onSubmit={submitHandler} className='flex flex-col flex-wrap w-full items-start justify-between'>
                <div className='w-full lg:w-1/2 flex flex-col mb-4'>
                    <h3 className='text-sm text-slate-700 mb-1 font-medium'>Full Name</h3>
                    <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-white border-[1px] border-slate-300' 
                        type="text" 
                        placeholder='Enter name' 
                        required 
                    />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col mb-4'>
                    <h3 className='text-sm text-slate-700 mb-1 font-medium'>Email</h3>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-white border-[1px] border-slate-300' 
                        type="email" 
                        placeholder='Enter email' 
                        required 
                    />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col mb-4'>
                    <h3 className='text-sm text-slate-700 mb-1 font-medium'>Password</h3>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-white border-[1px] border-slate-300' 
                        type="password" 
                        placeholder='Enter password' 
                        required 
                        minLength={6}
                    />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col mb-4'>
                    <h3 className='text-sm text-slate-700 mb-1 font-medium'>Role</h3>
                    <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-white border-[1px] border-slate-300'
                    >
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <div className='w-full lg:w-1/2 flex'>
                    <button className='bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm px-5 py-2 font-semibold w-4/5 mt-4 transition-colors'>
                        Create User
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser
