import {Schema,model} from "mongoose";

const userSchema = new Schema({
  email:{
    type:String,
    required:true,
    index:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  status:{
    type:Boolean,
    default:true,
    index:true
  }
},
{
  timestamps:true
}
);

export default model('User',userSchema);