import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import date from 'date-and-time';
import logger from '../../services/Logger/index.js';
import authModel from '../../models/v2/auth.js'

dotenv.config();
export const login = async(req,res) => {}
export const signup = async(req,res) => {
  logger.info("signup for new user started");

  const {email,username,password} = req.body;
  try {
    //validator middleware mein add karo
    const sChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(sChars.test(username)){
      logger.info(`Got a special char in username --> ${username}`);
      return res.status(400).json({message : "username with special characters not allowed."});
    }

    //
    const isExistingUser = await authModel.findOne({email},{username});
    if(isExistingUser){
      logger.info(`Found an existing user with these credentials --> ${username}: ${email}`);
      return res.status(400).json({message:"A user with this credentials already exists."});
    }

    const hashPassword = await bcrypt.hash(password,15);
    const today = date.format(Date.now(), 'hh:mm:ss A [GMT]Z'); // dnt
    
    const result = await authModel.create({email,username,password:hashPassword,loginCount:1,
      userCreatedOn:today,isToken:true});
    const token = jwt.sign({email,hashPassword},process.env.SECRET,{expiresIn: "1h"});
    logger.info(`token generated --> ${token}`)
    
    logger.info(`new user created --> ${JSON.stringify(result)}`);
    res.status(200).json({result,token,message:"user created successfully"});
  
    //sendEmailverification()
  } catch (error) {
    logger.error(`${JSON.stringify(error)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("signup completed successfully !!");
}
export const forgotPassword = async(req,res) => {}
export const verifyEmail = async(req,res) => {}