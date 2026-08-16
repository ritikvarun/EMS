import React, { useState } from 'react'

const Login = ({handleLogin}) => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = (e)=>{
        e.preventDefault()
        handleLogin(email,password)
        setEmail("")
        setPassword("")
    }


  return (
    <div className='flex h-full w-full items-center justify-center p-4'>
        <div className='relative z-10 bg-white/60 backdrop-blur-xl shadow-2xl rounded-2xl p-10 sm:p-14 w-full max-w-md border border-white/50'>
            <div className='mb-10 text-center'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
                    Employee<br/>
                    <span className='text-emerald-600 border-b-4 border-emerald-500 pb-1 inline-block mt-2'>Management</span>
                </h1>
                <p className='text-gray-500 mt-4 text-sm font-medium'>Please sign in to your account</p>
            </div>
            
            <form 
            onSubmit={(e)=>{
                submitHandler(e)
            }}
            className='flex flex-col items-center justify-center space-y-5'
            >
                <div className='w-full'>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Email Address</label>
                    <input 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    required 
                    className='w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl py-3 px-5 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all placeholder:text-gray-400' type="email" placeholder='admin@example.com' 
                    />
                </div>
                
                <div className='w-full pb-2'>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
                    <input
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required 
                    className='w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl py-3 px-5 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all placeholder:text-gray-400' type="password" placeholder='••••••••' />
                </div>
                
                <button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-3.5 px-8 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0'>
                    Sign In
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login