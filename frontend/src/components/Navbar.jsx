import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
    logout(); // This clears the context state and localStorage
    navigate('/login'); // Redirect to the login page
    }


  return (
    <nav className='w-full h-16 p-4 bg-gray-500 flex items-center justify-between text-white text-2xl font-bold'>
        <div className='text-xl font-serif'>
            <Link to="/home">NOTES APP</Link>
        </div>
        <input type="text" 
        placeholder='Search Notes...' 
        className=' px-4 py-2 rounded-md bg-gray-100 font-serif text-base'/>

       <div>
    {!user ? (
        <>
            <Link to="/login" 
            className='px-4 py-2 cursor-pointer font-serif rounded-md text-base bg-blue-800 mr-4'>Login</Link>          
            <Link to="/register" 
            className='px-4 py-2 cursor-pointer font-serif rounded-md text-base bg-green-600 mr-4'>Signup</Link> 
        </>
    ) : (
        <>
            <span className='px-4 py-2 font-serif text-xl'>{user.name}</span>
            <button 
            onClick={handleLogout}
            className='px-4 py-2 cursor-pointer font-serif rounded-md text-base bg-red-600 mr-4'>Logout</button>
        </>
    )}
</div>
        
    </nav>
  )
}
