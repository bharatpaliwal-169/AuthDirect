import express from 'express';
import {login,signup,forgotPassword,verifyUser} from '../../controllers/v2/auth.js';
import logMid from '../../middlewares/logmiddleware.js';
import validator from '../../middlewares/validator.js';
// import rate from '../../middlewares/rateLimiter.js';
const router = express.Router();

//customer routes
// router.post('/login',logMid,login);
router.post('/signup',logMid,validator,signup);
// router.post('/forgotpassword',logMid,forgotPassword);

router.get('/verification',logMid,verifyUser);

export default router;