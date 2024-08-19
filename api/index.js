import express from 'express';
import  mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();
// console.log(process.env.MONGO); 
mongoose
  .connect("mongodb+srv://atharavbhawsar06:BHV13yLMlpodRJPE@mern-estatehub.85yns.mongodb.net/?retryWrites=true&w=majority&appName=mern-estatehub")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });


const app = express();

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
}) 