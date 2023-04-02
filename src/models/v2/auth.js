import mongoose from 'mongoose';
const authSchema = mongoose.Schema({
  //user input
  username : { type: String , required : true,unique:true },
  email : { type: String , required  : true ,unique:true,trim : true,lowercase : true},
  password : { type: String , required : true },
  //sys generated
  id : { type: 'string' },
  isVerified : {type : Boolean , default : false},
  loginCount : {type : Number , default: 0},
  inValidPasswordCount : {type : Number, default: 0},  
  forgotPasswordCount : {type : Number,default: 0},
  role : {type : String , enum: ["customer", "admin" , "mod"] , default: "customer"},
  userStatus : {type:String , enum: ["Active", "Blocked"] , default: "Active"},
  lastLoggedIn : {type : String , default : ""},
  token : {type: String,default : ""},
  //on signup
  
  //Frontend Features
  // isToken : {type : Boolean , default: false}, //at logout false at login true
  // presence : {type: String , enum: ["online", "offline"], default: "online"},
  // userCreatedOn : {type:String , default : ""},
},{
  timestamps : true
});

var authv2 = mongoose.model('authv2', authSchema)
export default authv2;