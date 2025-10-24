import React,  {useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify'; 

export const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);  // New loading state
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login", 
                { email, password} 

            );
            if (response.data.success) {
                login(response.data.user);
                // Handle successful login (e.g., store token, redirect)
                localStorage.setItem("token", response.data.token);
                navigate("/home");
                // console.log("Login successful");
            }
            //  else {
            //     // Handle login failure (e.g., show error message)
            //     console.log("Login failed:", response.data.message);
            // }
            // console.log(response.data);
        }
        // catch(error){
        //     console.log(error.message);
        // }
        catch(error){
            // 🔑 FIX: This block handles all non-2xx status codes (like 401 Unauthorized, 400 Bad Request, network errors)
            
            // Extract the specific error message from the server response
            const serverMessage = error.response?.data?.message;
            
            // Use the specific message if available, otherwise use a generic error
            const errorMessage = serverMessage || "Network error or server unavailable.";
            
            console.error("Login attempt failed:", errorMessage);
            
            // 🔑 Display the error message to the user
            if (serverMessage) {
                toast.error(serverMessage); // Show specific error from server (e.g., "Invalid password")
            } else {
                toast.error("Invalid Email or Password. Please try again."); // Generic safety toast
            }
            setPassword(""); // Clear the password field state
        }
        finally {
            setLoading(false); // End loading regardless of success or failure
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className=' p-10 bg-white rounded-xl shadow-2xl shadow-blue-500/50 ' >
        <h2 className='text-2xl font-bold mb-4'>Login Page</h2>
        <form onSubmit={handleSubmit}>
          
            <div className='mb-4'>
                <label className='block text-gray-700' htmlFor="email">Email</label>
                <input 
                className='w-full rounded-md border border-gray-400 focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2'
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" 
                placeholder='Enter Your Email' 
                name="email" 
                required />
            </div>
            <div className='mb-4'>
                <label htmlFor="password">Password</label>
                <input 
                className='w-full rounded-md border border-gray-400 focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2'
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                id="password" 
                placeholder='Enter Your Password' 
                name="password" required />
            </div>
            
            <button 
            className='bg-teal-600 w-full rounded-md text-white px-3 py-2' 
            disabled={loading} // Disable button while loading
            type="submit">Login</button>
            <p className='text-center'>
              Don't Have Account? 
            <Link to="/register" className='text-blue-500 underline'> Register</Link>
            </p>
        </form>
        </div>
    </div>
  )
}

export default Login