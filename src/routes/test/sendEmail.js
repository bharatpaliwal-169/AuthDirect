import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const sendEmail = (req,res) =>{
  console.log("sending a email");
  const {email} = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: process.env.EMAIL_SECURE,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PSWD,
    },
  });
  const emailProps = {
    email: process.env.EMAIL_ID,
    pass : process.env.EMAIL_PSWD,
    host:process.env.EMAIL_HOST
  }
  console.log(emailProps);
  const mailOptions = {
    from: process.env.EMAIL_ID, // sender address
    to: email,
    subject: "Some subject", // Subject line
    html: `<p>test</p>`, // plain text body
  };
  try {
    transporter.sendMail(mailOptions,function(err,info){
      if(err){
        console.log(err);
      }else{
        console.log(info);
      }
    });
    res.status(200).json({message: "OK"});
  } catch (error) {
    res.status(500).json({message: "something went wrong " + error.message});
  }
}