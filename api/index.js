import express from 'express';
import  mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'
dotenv.config();
// console.log(process.env.MONGO); 

//connection to database
mongoose
  .connect("mongodb+srv://atharavbhawsar06:BHV13yLMlpodRJPE@mern-estatehub.85yns.mongodb.net/?retryWrites=true&w=majority&appName=mern-estatehub")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Connection failed!", error); 
  });

const __dirname = path.resolve();
const app = express() ;
app.use(express.json()); 
app.use(cookieParser());


//routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res , next) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

//middleware
app.use((err, req, res,  next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error "; 
  return res.status(statusCode).json( {
    success: false,
    statusCode,
    message
  });
});

//declring port number for the server
app.listen(3000, ()=>{
    console.log('server is running on port 3000')
}) 