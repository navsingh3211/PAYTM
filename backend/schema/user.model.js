import {Schema,model} from "mongoose";

const userSchema = new Schema({
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
    default:true
  }
},
{
  timestamps:true
}
);

export default model('User',userSchema);