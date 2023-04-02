// validate all the input feilds here
import isEmail from 'validator/lib/isEmail.js';
import logger from '../services/Logger/index.js';


const sChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
const inputValidator = async(req,res,next) => {
  var allOk = false;
  logger.info(`[validator.js] : checking input data.`);
  try {
    const {email,username,password} = req.body;
    //email
    if(email && isEmail(email)){
      allOk = true;
    }else{
      logger.error(`Got invalid email input : ${email}`)
      return res.status(400).json({message:"Invalid Email address"});
    }
    // password
    if(password && password.length >= 6 && password.length <= 20 && regex.test(password)){
      allOk=true;
    }else{
      logger.info("Invalid password captured");
      return res.status(400).json({message : "Password does not satisfy system requirements"});
    }
    //username
    if(username && !sChars.test(username)){
      allOk = true;
    }else{
      logger.info(`Got a special char in username --> ${username}`);
      return res.status(400).json({message : "username with special characters not allowed."});
    }
    if(allOk){
      next();
    }
  } catch (error) {
    logger.error(`[validator.js] : ERROR ${JSON.stringify(error.message)}`)
  }
}
export default inputValidator;
