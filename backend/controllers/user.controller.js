import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../schema/user.model.js';
import {
    userRegisterValidation,
    userLoginValidation
} from '../utils/userValidation.js';

export const registerUser = async (req,res,next)=>{
  try{
    const body = req.body;

    /*1.)validate the payload by zod*/
    const payLoadParse = userRegisterValidation.safeParse(body);
    if(!payLoadParse.success){
      res.status(411).json({
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
      res.status(411).json({
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

    res.status(200).json({
      success:true,
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

export const loginUser = async (req,res,next)=>{
  try{
    const body = req.body;

    /*1.) validate payload*/
    const payloadParse = userLoginValidation.safeParse(body);
    if(!payloadParse.success){
      res.status(411).json({
        success:false,
        message:payloadParse.error.errors[0].message
      });
    }

    /*2.) find user exist with given email or not*/
    const userDetails = await User.findOne({email:body.email,status:true});
    if(!userDetails){
      res.status(411).json({
        success:false,
        message:'Please pass a valid email or password'
      });
    }

    /*3.) varify password*/
    const encodedPassword = userDetails.password;
    const rawPassword = body.password;
    const isPasswordCorrect = await bcrypt.compare(rawPassword,encodedPassword);
    // console.log(isPasswordCorrect,'isPasswordCorrect');
    // process.exit(0);

    /*4.) after password varification,generate token and return success message*/
    if(isPasswordCorrect){
      const JWT_KEY = process.env.JWT_SECRET_KEY;
      const jwtData = {
        email:body.email,
        firstName:userDetails.firstName
      }
      const token = jwt.sign(jwtData,JWT_KEY,{expiresIn:"10d"});

      res.status(200).json({
        success:true,
        message:"User has been loggedin successfully",
        data:{
          userName:userDetails.firstName,
          token:token
        }
      })
    }else{
      res.status(411).json({
        success:false,
        message:'Password is incorrect.'
      });
    }
  }catch(error){
    console.log(error);
  }
}