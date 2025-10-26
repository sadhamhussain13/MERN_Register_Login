import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'; 

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const login = (userData) => {
        setUser(userData);
        // toast.success(`Login successful! Welcome, ${userData.name || 'User'}.`);

      // 2. Safely extract the name for the toast message
        // This ensures the code doesn't crash if userData is missing the 'name' field.
        const userName = userData && (userData.name || userData.username)
            ? (userData.name || userData.username) // Try 'name' or 'username'
            : 'User'; // Fallback name
        
        // 🔑 FIX: Use the safely determined userName variable
        toast.success(`Login successful! Welcome, ${userName}.`); 

    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token"); // Clear the stored token
        toast.info("You have been logged out.");
    }


  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
