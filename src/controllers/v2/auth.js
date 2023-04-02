import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authModel from '../../models/v2/auth.js'
import logger from '../../services/Logger/index.js';
import sendEmail from '../../services/email/index.js';

dotenv.config();
export const login = async(req,res) => {}

export const signup = async(req,res) => {
  logger.info("signup for new user started.....");
  const {email,username,password} = req.body;
  
  try {
    const takenName = await authModel.findOne({username});
    if(takenName){
      logger.info(`This username is already taken: ${username}`);
      return res.status(400).json({message:"username already taken !"});
    }

    const isExistingUser = await authModel.findOne({email});
    if(isExistingUser){
      logger.info(`Found an existing user with this email id: ${email}`);
      return res.status(400).json({message:"A user with this email id already exists."});
    }

    const hashPassword = await bcrypt.hash(password,15);
    const token = jwt.sign({email,hashPassword},process.env.SECRET,{expiresIn: "1h"});
    logger.info(`token generated --> ${token}`)
    
    const result = await authModel.create({email,username,password:hashPassword,loginCount:1,token:token});
    
    logger.info(`new user created --> ${JSON.stringify(result)}`);
    res.status(200).json({result,token,message:"user created successfully"});
  
    //sendEmailverification()
    sendEmail(email,"Email Verification","EMAIL_VERIFICATION",token);
  
  } catch (error) {
    logger.error(`Sign up method : ${JSON.stringify(error.message)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("signup ended");
}

export const forgotPassword = async(req,res) => {}

export const logout = async(req,res) => {
  //username , token
  const {username,token} = req.body;
  try {
    const currentUser = await authModel.findOne({username},{token});
    const id = currentUser._id;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
      logger.error(`[v2.controller.js] invalid id --> ${id}`);
      return res.status(404).send(`User not found`);
    }
    
    const newUser = {...currentUser , token:"" , _id:id};
    const result = await authModel.findByIdAndUpdate(id,newUser,{new:true});
    logger.info(`[v2.controller.js] user logged out with current info as : ${JSON.stringify(result)}`);
    res.status(200).json({message:"Logged out successfully"});
  } catch (error) {
    logger.error(`${JSON.stringify(error.message)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("user logged out successfully");
}

export const deleteAccount = async(req,res) => {}
export const changePassword = async(req,res) => {}
export const verifyUser = async(req,res) =>{
  logger.info("Email verification started");
  const {token} = req.query;
  try {
    const user = await authModel.findOne({token});
    const id = user._id;
    if (!mongoose.Types.ObjectId.isValid(id)){
      logger.error(`[v2.controller.js] invalid id --> ${id}`);
      return res.status(404).send(`User not found`);
    }
    const newUser = {...user,_id:id,token:token};
    const result = await authModel.findByIdAndUpdate(id,{newUser,$set:{isVerified:true}},{new:true});
    logger.info(`User verified! -> ${JSON.stringify(result)}`);
    
    res.status(200).json({message: "Email verification is successful"});

  } catch (error) {
    logger.error(`[verifyUser method]: ${JSON.stringify(error.message)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("Verification method ended");
}