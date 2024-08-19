import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';



const sigup = async (req, res, next) => {


const {username, email, password} = req.body;
const hashedPassword = bcryptjs.hashSync(password, 10);
const newUser =  new User({username, email, password: hashedPassword});

try{
    await newUser.save();
    res.status(201).json('user added sucessfully!');
}catch(error){
    next(error)
}

}
 
export default sigup