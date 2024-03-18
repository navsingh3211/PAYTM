import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../schema/user.model.js';
import {userRegisterValidation} from '../utils/userValidation.js';

export const registerUser = async (req,res,next)=>{
  try{
    const body = req.body;

    /*1.)validate the payload*/
    const payLoadParse = userRegisterValidation.safeParse(body);
    if(!payLoadParse.success){
      res.status(201).json({
        success:false,
        message:payLoadParse.error.errors[0].message
      });
    }

    /*2.)Check user already exit or not*/
    const userCount = await User.findOne({
      email:body.email,
      status:true
    },{_id:1});
    
    if(userCount){
      res.status(201).json({
        message:"User already exists with given email id."
      })
    }
    
    /*3.) create user and also encript user password first*/
    const encryptedPassword = await bcrypt.hash(body.password,10);
    // console.log(await bcrypt.compare(body.password,encryptedPassword));
    body.password=encryptedPassword;
    await User.create(body);

    /*4.) generate the jwt token*/
    const JWT_KEY = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
      {email:body.email,firstName:body.firstName},
      JWT_KEY,
      {expiresIn:"10d"}
    );

    res.status(201).json({
      message:"User has been registered successfully",
      data:{
        userName:body.firstName + ' ' + body.lastName,
        token:token
      }
    })
  }catch(error){
    console.log(error);
  }
}