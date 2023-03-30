import mongoose from 'mongoose';
const authSchema = mongoose.Schema({
  id : { type: 'string' },
  username : { type:String , required : true },
  email : { type: String , required  : true ,unique:true,trim : true,lowercase : true},
  password : { type: String , required : true },
  isVerified : {type : Boolean , default : false},
  loginCount : {type : Number , default: 0},
  inValidPasswordCount : {type : Number, default: 0},  
  role : {type : String , enum: ["customer", "admin" , "mod"] , default: "customer"},
  userStatus : {type:String , enum: ["Active", "Blocked"] , default: "Active"},
  presence : {type:String , enum: ["online", "offline"]},
  userCreatedOn : {type:String , default : ""},
  lastLoggedIn : {type : String , default : ""}
},{
  timestamps : true
});

var authv2 = mongoose.model('authv2', authSchema)
export default authv2;