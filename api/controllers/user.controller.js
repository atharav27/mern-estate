import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const test = (req, res) => { 
    res.json({message: "message"} )

}

export  const updateUser =  async (req, res, next) => {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
};
 export default test;