
import express from 'express';
const router = express.Router();
import userRoute from './userRoute.js';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get("/",(req,res)=>{
    res.status(201).json({
      message:"welcome to payTm app."
    })
  });
  router.use('/user', userRoute);
  // router.use('/admin/inventory/category', categoryRoute);
  return router;
};

export default routes;
