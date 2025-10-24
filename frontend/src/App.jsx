import { Signup } from "./pages/Signup"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { useEffect, useState } from "react"

function App() {

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
