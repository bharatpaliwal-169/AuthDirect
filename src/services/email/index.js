import nodemailer from 'nodemailer';
import logger from '../Logger/index.js';
import dotenv from 'dotenv';

import verifyEmail from './templates/emailVerify.js'

dotenv.config()
const sendEmail = (reciptent,subject,type,TOKEN) =>{
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: process.env.EMAIL_SECURE,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PSWD,
    },
  });
  var body = "";
  switch (type) {
    case "FORGOTPASSWORD":
      body = `<h1>Forgot password !!</h1>
      <p> click <a href="${TOKEN}">here</a>
      <p> <b> You are welcome to Memofeed </b> </p>
      <h6>Developed by Bharat Paliwal</h6>
      `;
      break;
    
    case "EMAIL_VERIFICATION":
      body = verifyEmail(TOKEN);
      break;
    default:
      break;
  }
  const mailOptions = {
    from: process.env.EMAIL_ID, // sender address
    to: reciptent,
    subject: subject, // Subject line
    html: body, // plain text body
  };
  try {
    transporter.sendMail(mailOptions,function(err,info){
      if(err){
        logger.error(`[email.js] ERROR: ${err.message}`);
      }else{
        logger.info(`[email.js] ${JSON.stringify(info)}`);
      }
    });
    return "OK";
  } catch (error) {
    logger.error(error.message);
    return "ERROR"
  }
};

export default sendEmail;