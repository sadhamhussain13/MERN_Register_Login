import express from 'express'; // express: creates the backend server. It listens for requests.
import cors from 'cors';  //cors(): enables communication between different domains (React on port 3000 ↔ Node on 5000).
import authRoutes from './routes/auth.js'; // This means any route starting with /api/auth will be handled by the auth.js file.
import connectToMongoDB from './database/db.js'; // connectDB: function to connect to MongoDB.
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); //express.json(): parses incoming JSON requests and puts the parsed data in req.body.
app.use("/api/auth", authRoutes);


// const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    connectToMongoDB();
  console.log('Server running on port 5000');
})
