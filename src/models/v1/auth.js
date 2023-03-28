import mongoose from 'mongoose';

const authSchema = mongoose.Schema({
  username : { type:'string' , required : true },
  email : { type:'string' , required  : true},
  password : { type:'string' , required : true },
  id : { type: 'string' }
});

var authv1 = mongoose.model('authv1', authSchema)
export default authv1;