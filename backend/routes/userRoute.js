import express from 'express';
import {
  registerUser,
  loginUser,
  updateUserInfo,
  getAllUser
} from '../controllers/user.controller.js';
import {verifyToken} from '../middlewares/auth_middleware.js';

const router = express.Router();

const routes = ()=>{
  router.get("/",(req,res)=>{
    res.status(201).json({
      message:"welcome to payTm app."
    })
  });
  router.post('/register',registerUser);
  router.post('/login',loginUser);
  router.put('/update-user-info',verifyToken,updateUserInfo);
  router.get('/user/bulk',getAllUser);
  return router;
}

export default routes;