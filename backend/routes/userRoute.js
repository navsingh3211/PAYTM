import express from 'express';
import {registerUser,loginUser} from '../controllers/user.controller.js';
const router = express.Router();

const routes = ()=>{
  router.get("/",(req,res)=>{
    res.status(201).json({
      message:"welcome to payTm app."
    })
  });
  router.post('/register',registerUser);
  router.post('/login',loginUser);
  return router;
}

export default routes;