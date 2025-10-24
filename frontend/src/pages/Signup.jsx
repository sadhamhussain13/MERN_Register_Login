import React,  {useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Signup = () => {
    // State variables for form fields and loading status
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Helper function to reset password fields after failure
    const clearPasswords = () => {
        setPassword("");
        setCpassword("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = []; // Array to accumulate validation error messages

    // ------------------ 1. INPUT NORMALIZATION ------------------
        // Remove leading/trailing spaces and replace multiple internal spaces with a single space.
        const normalizedName = name.trim().replace(/\s+/g, ' '); 
    
    // ------------------ FRONTEND VALIDATION START (Error Accumulation) ------------------

        // 2. Name Validation (Only letters and spaces, min 2 chars)
        // Note: The regex /^[A-Za-z\s]{2,}$/ is still the core check for allowed characters and min length.
        if (!/^[A-Za-z\s]{2,}$/.test(normalizedName) || name.trim() !== normalizedName) {
            // The second part of the condition (name.trim() !== normalizedName) specifically catches the multiple space issue.
            validationErrors.push("Name must contain only letters and a single space between words (minimum 2 characters).");
        }

        // 3. Email Validation (Basic format: contains non-space @ non-space . non-space)
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            validationErrors.push("Please enter a valid email address (e.g., user@domain.com).");
        }
        
        // 4. Password Complexity Validation (Min 8, Max 12, Upper, Lower, Number, Symbol)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,12}$/;
        
        if (!passwordRegex.test(password)) {
            validationErrors.push("Password must be 8-12 characters and include: uppercase, lowercase, number, and a symbol.");
        }

        // 5. Password Match Check
        if (password !== cpassword) {
            validationErrors.push("Passwords do not match.");
        }

        // ------------------ 🔑 6. CHECK FOR ACCUMULATED ERRORS --------------------
        if (validationErrors.length > 0) {
            // If errors exist, show ALL of them using toast.error for each message
            validationErrors.forEach(msg => toast.error(msg));
            
            clearPasswords(); // Clear passwords on failed validation
            return; // STOP the function and prevent API call
        }

        // ------------------ FRONTEND VALIDATION END --------------------

        setLoading(true); // Start loading
        
        try{
            const response = await axios.post("http://localhost:5000/api/auth/register", 
                {name: normalizedName, email, password, cpassword} 
            );
            
            // Standard Success Path (If backend returns a 2xx status)
            toast.success("Signup complete! Please login to your account.");
            navigate("/login");

        } catch (error) {
            const serverResponse = error.response;

            // Handling Non-Standard Success (Backend returns 400 but the registration was successful)
            if (serverResponse && 
                serverResponse.status === 400 && 
                serverResponse.data?.message === 'User registered successfully'
            ) {
                // Treat this as a success and navigate
                toast.success("Signup complete! Please login to your account.");
                navigate("/login");
                return; // Exit here
            }

            // Actual Failure Path (Duplicate user, validation error, network failure)
            const errorMessage = serverResponse?.data?.message || "Registration failed. Check connection or server status.";
            console.error("Registration failed:", errorMessage);

            toast.error(errorMessage);
            
            // State Cleanup: Clear sensitive fields after failure
            clearPasswords();

        } finally {
            // Always stop loading, regardless of success or failure
            setLoading(false); 
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className=' p-10 bg-white rounded-xl shadow-2xl shadow-blue-500/50 ' >
            <h2 className='text-2xl font-bold mb-4'>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700' htmlFor="username">Name</label>
                    <input
                    type="text" 
                    value={name}
                    name="username" 
                    onChange={(e) => setName(e.target.value)}
                    className='w-full rounded-md border border-gray-400 focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2'
                    id="username" 
                    placeholder='Enter Your Name' 
                    required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700' htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full rounded-md border border-gray-400 focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2'
                    id="email" 
                    placeholder='Enter Your Email' 
                    required />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password">Password</label>
                    <input 
        
                    type="password" 
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full rounded-md border border-gray-400 focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2'
                    id="password" 
                    placeholder='Enter Your Password'  
                    required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700' htmlFor="cpassword">Confirm Password</label>
                    <input 
                    className='w-full rounded-md border border-gray-400 focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2'
                    onChange={(e) => setCpassword(e.target.value)}
                    type="password" 
                    value={cpassword}
                    name="cpassword"
                    id="cpassword" 
                    placeholder='Confirm Your Password' 
                    required />
                </div>
                <button 
                disabled={loading} // Disable button while loading
                className='bg-teal-600 w-full rounded-md text-white px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed' 
                type="submit">
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
                <p className='mt-4'>Already have an account? 
                <Link to="/login" className='text-blue-500 underline'> Login</Link>
                </p>
            </form>
            </div>
        </div>
    )
}

export default Signup
