import express from "express";
import User from "../models/User.js"; //User: represents the user data model in the database.
import bcrypt from "bcryptjs"; //bcryptjs: used for hashing passwords securely.
import jwt from "jsonwebtoken"; //jsonwebtoken: used for creating and verifying JSON Web Tokens (JWT) for authentication.
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();   //express.Router(): acts like a mini Express app for grouping routes.

router.post("/register", async (req, res) => { //router.post("/signup"): defines a route that handles POST requests (used for sending form data securely).
    try{
        const {name, email, password, cpassword} = req.body; //req.body: contains the data sent by the client in the request body.
        const user = await User.findOne({email}); //User.findOne(): checks if a user with the given email already exists in the database.
        if(user){
            return res.status(400).json({message: "User already exists"}); //res.status(400).json(): sends a 400 Bad Request response with a JSON message.
        }
        if(password !== cpassword){
            return res.status(400).json({message: "Passwords do not match"});
        }
        const hashPassword = await bcrypt.hash(password, 10); //bcrypt.hash(): hashes the password with a salt factor of 10 for security.
        const hashCPassword = await bcrypt.hash(cpassword, 10); //bcrypt.hash(): hashes the confirm password with a salt factor of 10 for security.

        const newUser = new User({name, email, password: hashPassword, confirmPassword: hashCPassword}); //new User(): creates a new user instance with the provided data.
        await newUser.save(); //newUser.save(): saves the new user to the database.

        return res.status(201).json({message: "User registered successfully"}); //res.status(201).json(): sends a 201 Created response with a success message.

    } catch(error){
        console.error("Error during User registration:", error.message);
        return res.status(500).json({message: "Server error"});
    }
    res.send("User registered"); //res.send(): sends a response back to the client.
});

router.post("/login", async (req, res) => { //router.post("/signup"): defines a route that handles POST requests (used for sending form data securely).
    try{
        const { email, password } = req.body; //req.body: contains the data sent by the client in the request body.
        const user = await User.findOne({email}); //User.findOne(): checks if a user with the given email already exists in the database.
        if(!user){
            return res.status(400).json({message: "User not exists"}); //res.status(400).json(): sends a 400 Bad Request response with a JSON message.
        }

        const checkPassword = await bcrypt.compare(password, user.password); //bcrypt.compare(): compares the provided password with the stored hashed password.

        if(!checkPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign( //jwt.sign(): creates a JWT token with the user's ID as payload, signed with a secret key, and an expiration time of 1 hour.
            { userId: user._id },
            process.env.JWT_SECRET, // In a real application, use an environment variable for the secret key.
            { expiresIn: "1h" }
        );
        
        return res.status(201)
        .json({success:true, token, user:{name: user.name},  message: "Login successfully"}); //res.status(201).json(): sends a 201 Created response with a success message.

    } catch(error){
        console.error("Error during User Login:", error.message);
        return res.status(500)
        .json({success: false, message: "Login Server Error"});
    }
});

// auth.js - New /api/verifyToken logic

router.get("/verifyToken", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // 🔑 Use process.env.JWT_SECRET for consistency!
    if (err) return res.status(403).json({ message: "Invalid token" });
    
    try {
      // 🔑 Fetch the user's name from the database using the ID from the token
      const user = await User.findById(decoded.userId).select('name email'); // Only select needed fields

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // 🔑 Send back the user data the frontend expects (e.g., { name: "...", email: "..." })
      res.json({ success: true, user: { name: user.name, email: user.email } });
      
    } catch (error) {
      console.error("Database error during token verification:", error);
      return res.status(500).json({ message: "Server error during user lookup" });
    }
  });
});

export default router;