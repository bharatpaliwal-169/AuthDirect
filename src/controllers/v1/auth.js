import bcrypt from 'bcrypt';
import authModel from "../../models/v1/auth.js"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const login = async(req,res) => {
  const {email,password} = req.body;
  try {
    const isExistingUser = await authModel.findOne({email});
    if(!isExistingUser){
      return res.status(404).json({message : "No user exists with these credentials!"});
    }
    const isPasswordCorrect = await bcrypt.compare(password,isExistingUser.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message : "Password is incorrect!"});
    }

    res.status(200).json({message: "Successful login " + `User : ${isExistingUser.username}`});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong from server-side :("})
  }
}

export const signup = async(req,res) => {
  const {email,username,password,confirmPassword} = req.body;

  try {
    const isExistingUser = await authModel.findOne({email});
    const sChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
    if(sChars.test(username)){
      return res.status(400).json({message:"Uh-Oh! username have special characters,Kindly avoid them"});
    }
    if(isExistingUser){
      return res.status(400).json({message:"A user with this credentials already exists."});
    }
    if(password !== confirmPassword){
      return res.status(400).json({message:"Mismatched password and confirm password!"});
    }
    const hashPassword = await bcrypt.hash(password,12);
    const result = await authModel.create({email,password:hashPassword,username});
    console.log("New user created " + result);
    res.status(200).json({result,message:"user created successfully :)"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Somthing went wrong on server"});
  }
}

export const forgotPassword = async(req,res) => {
  const {email,password} = req.body;
  try {
    const isExistingUser = await authModel.findOne({email});
    if(!isExistingUser){
      return res.status(400).json({message:"Wrong email"});
    }
    const newPassword = await bcrypt(password,12);
    const updateUser = {
      id : isExistingUser._id,
      email : email,
      password : newPassword,
      username : isExistingUser.username
    }
    if (!mongoose.Types.ObjectId.isValid(id)){
      console.log("invalid user id :" + id);
      return res.status(404).send(`Cannot update this user !`);
    } 
    const result = await auth.findByIdAndUpdate(isExistingUser._id,updateUser,{new:true});
    console.log("user updated " + result);
    res.status(200).json({updateUser,message:"user updated successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
}
