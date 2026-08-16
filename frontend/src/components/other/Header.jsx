import React from 'react'

const Header = (props) => {
  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
  }
  
  return (
    <div className='flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-6 py-4 shadow-md text-white'>
        <h1 className='text-lg sm:text-2xl font-medium leading-tight'>
          Hello <br /> 
          <span className='text-2xl sm:text-3xl font-semibold'>{props.data?.name || 'Admin'} 👋</span>
        </h1>
        <button onClick={logOutUser} className='bg-red-500 hover:bg-red-600 text-sm sm:text-base font-medium text-white px-4 sm:px-6 py-2 rounded-lg transition-colors shadow-sm'>Log Out</button>
    </div>
  )
}

export default Header