import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authModel from '../../models/v2/auth.js';
import logger from '../../services/Logger/index.js';
import sendEmail from '../../services/email/index.js';

dotenv.config();
export const login = async(req,res) => {
  logger.info("Login method started...");
  
  const {username,password,email} = req.body;
  try {

    const user = await authModel.findOne({email,username});
    
    
    if(!user){
      logger.warn(`Recieved invalid user details : ${email} : ${username}`);
      return res.status(401).json({message:"user not found!!"});
    }
    const id = user._id ? user._id : "";
    if (!mongoose.Types.ObjectId.isValid(id)){
      logger.error(`[v2.controller.js] invalid id --> ${id}`);
      return res.status(500).json({message:"Something went wrong"});
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
      logger.warn(`invalid password recieved!`);
      const invpswdCount = user.inValidPasswordCount + 1;
      const invResult = await authModel.findByIdAndUpdate(id,{user,$set:{inValidPasswordCount:invpswdCount}},{new:true});
      return res.status(401).json({message: "Invalid password !!"});
    }

    // role based decision is yet to implement
    // currently its common method for all to login, for admin (2 pin system) , for mod (2FA)

    if(user.inValidPasswordCount > process.env.MAX_COUNT){
      logger.info(`user have entered too many wrong passwords.`);
      return res.status(403).json({message: "Too many wrong attempts!!"});
    }
    if(user.userStatus !== "Active"){
      logger.info(`user is blocked ${user.username} : ${user.email}`);
      return res.status(403).json({message: "User is blocked!"});
    }

    const newLoginCount = user.loginCount + 1;
    const newLoginTime = `${new Date().toDateString()} ${new Date().toTimeString()}`;
    const token = jwt.sign({email,username},process.env.SECRET,{expiresIn:"3h"});
    logger.info(`token generated -> ${token}`);

    const result = await authModel.findByIdAndUpdate(id,{user,$set:{lastLoggedIn:newLoginTime,loginCount:newLoginCount,token:token}},{new:true});
    logger.info(`user successfuly logged in..... ${user.username} at ${newLoginTime}`);

    res.status(200).json({result,token,message:"user logged in successfully"});

  } catch (error) {
    logger.error(`[login] ${error.message}`);
    res.status(500).json({message: "Something went wrong, Please try again later"});
  }
  logger.info("login method finished...");
};


export const logout = async(req,res) => {

  //username , token
  const {username,token} = req.body;
  try {
    const currentUser = await authModel.findOne({username,token});
    const id = currentUser._id ? currentUser._id : "";
    
    if (!mongoose.Types.ObjectId.isValid(id)){
      logger.error(`[v2.controller.js] invalid id --> ${id}`);
      return res.status(404).send(`User not found`);
    }
    
    const result = await authModel.findByIdAndUpdate(id,{currentUser,$set:{token:""}},{new:true});
    
    res.status(200).json({message:"Logged out successfully"});
  } catch (error) {
    logger.error(`${JSON.stringify(error.message)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("user logged out successfully");
};

// on change paswd -> pswdChange++ , invalCount = 0
// for changePswd -> email -> url+token -> OTP check -> change password

export const changePasswordReq = async(req,res) => {
  logger.info("Recieved req for change pswd");
  
  const {email} = req.body;
  try {
    const user = await authModel.findOne({email});
    if(!user){
      logger.warn(`invalid emaild id recieved : ${email}`);
      return res.status(400).json({message:"We dont have account with that email ID"});
    }
    if(user.userStatus !== "Active"){
      logger.warn(`user is blocked ${user.email} : ${user.username}`)
      return res.status(403).json({message:"User is blocked"});
    } 

    const token = jwt.sign({email},process.env.SECRET,{expiresIn:"5m"});
    const changePswdCount = user.changePasswordCount + 1;
    const result = await authModel.findByIdAndUpdate(user._id,{user,$set:{token:token,changePasswordCount:changePswdCount,inValidPasswordCount:0}},{new :true});

    res.status(200).json({message:"sent a email with your request"});
    sendEmail(user.email,"Change Password","CHANGEPASSWORD",token);

  } catch (error) {
    logger.error(`[changePasswordReq]:  ${JSON.stringify(error.message)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("user have been sent a mail for CP req");
}


export const changePassword = async(req,res) => {
  logger.info("Got changePassword request ");

  const {token} = req.query;
  const {password,confirmPassword} = req.body;
  try {
    const user = await authModel.findOne({token});

    logger.info(`[changePassword]: This user have requested CP -> ${JSON.stringify(user.username)}`);

    if(!user){
      logger.warn(`[changePassword] request expired ${token}`);
      return res.status(401).json({message:"Cannot change password right now."});
    }
    if(password !== confirmPassword){
      return res.status(400).json({message:"Mismatched password and confirm password"});
    }
    if(!password && password.length < 6 && password.length > 20 && regex.test(password)){
      logger.info("unqualified password");
      return res.status(406).json({message:"Password lack strength"});
    }

    if(user.changePasswordCount > process.env.MAX_COUNT){
      logger.warn(`User have changed password many times ${user.email} : ${user.username} `);
      return res.status(400).json({message:"You have changed password too many times"});
    }

    const id = user._id;
    const newCPC = user.changePasswordCount + 1;
    
    const salt =  await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password,salt,12);
    
    const lastChangeTime = `${new Date().toDateString()} ${new Date().toTimeString()}`;
    const result = await authModel.findByIdAndUpdate(id,{user,$set:{password:hashPassword,changePasswordCount:newCPC,inValidPasswordCount:0,lastPasswordChanged:lastChangeTime}},{new:true});
    logger.info(`[changePassword] user updates : changePasswordCount : ${JSON.stringify(newCPC)} at ${lastChangeTime}`);
    
    res.status(202).json({message:"password changed successfully"});
  } catch (error) {
    logger.error(`[changePassword]: ${error.message}`);
  }
  logger.info("changePassword method completed");
}


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

    const salt =  await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password,salt,12);

    const token = jwt.sign({email,hashPassword},process.env.SECRET,{expiresIn: "1h"});
    logger.info(`token generated --> ${token}`)
    
    const result = await authModel.create({email,username,password:hashPassword,loginCount:1,token:token});
    // only time in entire app when complete obj is printed
    logger.info(`new user created --> ${JSON.stringify(result)}`);
    res.status(201).json({result,token,message:"user created successfully"});
  
    //sendEmailverification
    sendEmail(email,"Email Verification","EMAILVERIFICATION",token);
  
  } catch (error) {
    logger.error(`Sign up method : ${JSON.stringify(error.message)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("signup ended");
};


export const forgotPswdReq = async(req,res) => {
  logger.info("[forgotPswd method] started.");
  
  const {email} = req.body;
  try {
    const user = await authModel.findOne({email});
    if(!user){
      logger.warn(`[forgotPswdReq] recieved invalid email : ${email}`);
      return res.status(400).json({message:"invalid email"});
    }
    
    const id = user._id ? user._id : "";
    if (!mongoose.Types.ObjectId.isValid(id)){
      logger.error(`[v2.controller.js] invalid id --> ${id}`);
      return res.status(500).json({message:"Something went wrong"});
    }
    
    const token = jwt.sign({email},process.env.SECRET,{expiresIn:"1h"});

    const result = await authModel.findByIdAndUpdate(id,{user,$set:{token:token}},{new:true});
    logger.info(`[forgotPaswdReq] sent mail to user with FP request with token -> ${JSON.stringify(token)}`);

    sendEmail(user.email, "Forgot Password", "FORGOTPASSWORD", token);
    res.status(200).json({message:"We have sent you a email"});
  
  } catch (error) {
    logger.error(`[forgotPswdReq] ${error.message}`);
  }
  logger.info("forgot password mail sent");
};


export const forgotPassword = async(req,res) => {
  logger.info("forgotPassword method started");
  
  const {token} = req.query;
  try {
    const user = await authModel.findOne({token});

    logger.info(`[forgotPassword]: This user have requested FP -> ${JSON.stringify(user.username)}`);

    if(!user){
      logger.warn(`[forgotpassword] request expired ${token}`);
      return res.status(401).json({message:"Request expired!"});
    }

    if(user.forgotPasswordCount == process.env.MAX_COUNT){
      logger.warn(`User have forgot too much ${user.email} : ${user.username} `);
      return res.status(400).json({message:"All requests exausted!"});
    }

    const id = user._id;
    const newFPC = user.forgotPasswordCount + 1;
    const result = await authModel.findByIdAndUpdate(id,{user,$set:{forgotPasswordCount:newFPC}},{new:true});
    logger.info(`[forgotPassword] user updates : forgotPasswordCount : ${JSON.stringify(newFPC)}`);
    
    // fwd him to change password method
    res.status(202).json({message:"You can now access your account"});
  } catch (error) {
    logger.error(`[forgotPassword]: ${error.message}`);
  }
  logger.info("forgotPassword method completed");
};


export const deleteAccount = async(req,res) => {
  logger.info("delete method initalized");
  
  const {email,password} = req.body;
  try {
    const user = await authModel.findOne({email});
    const id = user._id;
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    
    if (!mongoose.Types.ObjectId.isValid(id)){
      logger.error(`[v2.controller.js] invalid id --> ${id}`);
      return res.status(405).send(`Method not allowed!`);
    }

    if(isPasswordCorrect){
      await authModel.findByIdAndDelete(id);
    }else{
      logger.error(`[deleteAccountMethod] Invalid password`);
      return res.status(403).json({message:"Action cannot be done!"});
    }
    
    res.status(200).json({message:"See you soon"});
  } catch (error) {
    logger.error(`[deleteAccountMethod] ${error.message}`);
  }
  logger.info("delete method completed");
};

export const verifyUser = async(req,res) =>{
  logger.info("Email verification started");
  
  const {token} = req.query;
  try {
    const user = await authModel.findOne({token});
    
    const id = user._id;
    if (!mongoose.Types.ObjectId.isValid(id)){
      logger.error(`[v2.controller.js] invalid id --> ${id}`);
      return res.status(500).send(`User not found`);
    }
    
    const newUser = {...user,_id:id,token:token};
    const result = await authModel.findByIdAndUpdate(id,{newUser,$set:{isVerified:true}},{new:true});
    logger.info(`[verifyUser method]: User verified!`);
    
    res.status(200).json({message: "Email verification is successful"});

  } catch (error) {
    logger.error(`[verifyUser method]: ${JSON.stringify(error.message)}`);
    res.status(500).json({message:"Something went wrong."});
  }
  logger.info("Verification method ended");
};