import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const sigup = async (req, res, next) => {
  const { username, email, password } = req.body;
   // Validate input fields
   if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user added sucessfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try { 
    const validUser = await User.findOne({email});
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, 'atharav');
    //here secret key is throwing issue while fethin it from envionment variable
    const {password : pass, ...rest} = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) { 
    next(error);
  }
};


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, 'atharav');
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, 'atharav');
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

