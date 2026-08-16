import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { loginUser } from './utils/localStorage'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if (loggedInUser) {
      try {
        const storedUser = JSON.parse(loggedInUser)
        if (storedUser && storedUser.role) {
          setUser(storedUser.role)
          setLoggedInUserData(storedUser.data)
        }
      } catch (err) {
        console.error("Error parsing loggedInUser from localStorage", err)
      }
    }
  }, [])

  // Sync loggedInUserData to localStorage whenever it changes
  useEffect(() => {
    if (loggedInUserData) {
      const stored = localStorage.getItem('loggedInUser')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          parsed.data = loggedInUserData
          localStorage.setItem('loggedInUser', JSON.stringify(parsed))
        } catch (err) {
          console.error("Error updating loggedInUser in localStorage", err)
        }
      }
    }
  }, [loggedInUserData])

  // Refresh loggedInUserData from the userData in AuthContext
  useEffect(() => {
    if (userData && user === 'employee' && loggedInUserData) {
      const currentUserId = loggedInUserData._id || loggedInUserData.id;
      const updatedUser = userData.find(u => u._id === currentUserId || u.id === currentUserId);
      if (updatedUser) {
        if (JSON.stringify(updatedUser) !== JSON.stringify(loggedInUserData)) {
          setLoggedInUserData(updatedUser);
        }
      }
    }
  }, [userData, user, loggedInUserData])

  const handleLogin = (email, password) => {
    const result = loginUser(email, password)
    if (result.success) {
      setUser(result.role)
      setLoggedInUserData(result.user)
      localStorage.setItem('loggedInUser', JSON.stringify({ role: result.role, data: result.user, token: result.token }))
    } else {
      alert(result.message || "Invalid Credentials")
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
            {user === 'admin' ? <AdminDashboard changeUser={setUser} /> : (user === 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} updateData={setLoggedInUserData} /> : null) }
        </div>
    </div>
  )
}

export default App