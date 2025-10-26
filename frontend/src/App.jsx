import { Signup } from "./pages/Signup"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "./context/AuthProvider"

function App() {

    // Remove or comment out the local useState for user/setUser
    // const [user, setUser] = useState(null); 

    // Destructure setUser from your useAuth context
    const { setUser } = useAuth(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:5000/api/auth/verifytoken", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data.user); // This now calls the context's setter
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null); // This now calls the context's setter (Fixes the error)
                });
        }
    //  Add setUser to the dependency array
    }, [setUser]);

//   const [user, setUser] = useState(null);

// useEffect(() => {
//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     setUser(JSON.parse(storedUser));
//   }
// }, []);

  return (
      <div>
        
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </BrowserRouter>
        
      </div>
  )
}

export default App
