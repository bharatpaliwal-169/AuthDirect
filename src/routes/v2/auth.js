import express from 'express';
import {login,signup,forgotPassword,verifyUser,deleteAccount,forgotPswdReq
} from '../../controllers/v2/auth.js';
import logMid from '../../middlewares/logmiddleware.js';
import validator from '../../middlewares/validator.js';
// import rate from '../../middlewares/rateLimiter.js';
const router = express.Router();

//customer routes
// router.post('/login',logMid,login);
// router.post('/logout',logMid,login);
// router.post('/changePassword',logMid,login);

router.post('/signup',logMid,validator,signup);
router.get('/forgotpassword',logMid,forgotPassword);

router.get('/verification',logMid,verifyUser);
router.delete('/deleteaccount',logMid,deleteAccount);
router.post('/forgot/request',logMid,forgotPswdReq);
export default router;