import zod from 'zod';

export const userRegisterValidation = zod.object({
  
    email:zod.string().refine((val)=>val.trim().length>0,{
      message:'Please enter the email'
    }),
    firstName:zod.string().refine((val)=>val.trim().length>0,{
      message:'Please enter the first name'
    }),
    lastName:zod.string().refine((val)=>val.trim().length>0,{
      message:'Please enter the last name'
    }),
    password:zod.string().refine((val)=>val.trim().length>0,{
      message:'Please enter the password'
    })

});