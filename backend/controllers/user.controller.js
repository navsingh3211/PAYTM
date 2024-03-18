import User from '../schema/user.model.js';

export const registerUser = async (req,res,next)=>{
  const user= await User.create({
    firstName:"ram",
    lastName:"singh",
    password:"123fef"
  });
  res.status(201).json({
    message:"User has been registed successfully."
  })
}