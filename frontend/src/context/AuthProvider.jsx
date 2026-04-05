import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../utils/apiConfig'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/users`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        
        fetchUsers()
    }, [])

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider