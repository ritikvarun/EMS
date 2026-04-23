import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { BASE_URL } from './utils/apiConfig'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData,SetUserData] = useContext(AuthContext)

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const storedUser = JSON.parse(loggedInUser)
      setUser(storedUser.role)
      setLoggedInUserData(storedUser.data)
    }

  },[])

  // Sync loggedInUserData to localStorage whenever it changes
  useEffect(() => {
    if (loggedInUserData) {
      const stored = localStorage.getItem('loggedInUser')
      if (stored) {
        const parsed = JSON.parse(stored)
        parsed.data = loggedInUserData
        localStorage.setItem('loggedInUser', JSON.stringify(parsed))
      }
    }
  }, [loggedInUserData])

  // Refresh loggedInUserData from the server data (userData from AuthContext)
  useEffect(() => {
    if (userData && user === 'employee' && loggedInUserData) {
      const currentUserId = loggedInUserData._id || loggedInUserData.id;
      const updatedUser = userData.find(u => u._id === currentUserId || u.id === currentUserId);
      if (updatedUser) {
        // Only update if something actually changed (to avoid infinite loops or unnecessary re-renders)
        if (JSON.stringify(updatedUser) !== JSON.stringify(loggedInUserData)) {
          setLoggedInUserData(updatedUser);
        }
      }
    }
  }, [userData, user, loggedInUserData])


  const handleLogin = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if(response.ok){
            const loggedInUser = data.user
            const userRole = loggedInUser.role.toLowerCase()
            setUser(userRole)
            setLoggedInUserData(loggedInUser)
            localStorage.setItem('loggedInUser', JSON.stringify({ role: userRole, data: loggedInUser, token: data.token }))
        } else {
            alert(data.message || "Invalid Credentials")
        }
    } catch(err) {
        console.error(err);
        alert("Server Error")
    }
  }



  return (
    <div className="fixed inset-0 w-full h-full bg-slate-50 font-sans overflow-hidden">
        {/* Global Background abstract floating shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>

        {/* Global Content Wrapper */}
        <div className="relative z-10 w-full h-full overflow-y-auto">
            {!user ? <Login handleLogin={handleLogin} /> : ''}
            {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} updateData={setLoggedInUserData} /> : null) }
        </div>
    </div>
  )
}

export default App