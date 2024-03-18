import express from 'express';
import {registerUser} from '../controllers/user.controller.js';
const router = express.Router();

const routes = ()=>{
  router.get("/",(req,res)=>{
    res.status(201).json({
      message:"welcome to payTm app."
    })
  });
  router.get('/register',registerUser);
  return router;
}

export default routes;