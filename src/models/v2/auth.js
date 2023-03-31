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
  role : {type : String , enum: ["customer", "admin" , "mod"] , default: "customer"},
  userStatus : {type:String , enum: ["Active", "Blocked"] , default: "Active"},
  presence : {type: String , enum: ["online", "offline"], default: "online"},
  lastLoggedIn : {type : String , default : ""},
  //on signup
  userCreatedOn : {type:String , default : ""},
  isToken : {type : Boolean , default: false}, //at logout false at login true
},{
  timestamps : true
});

var authv2 = mongoose.model('authv2', authSchema)
export default authv2;