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
router.get('/verification',logMid,verifyUser);
router.post('/forgot/request',logMid,forgotPswdReq);
router.get('/forgotpassword',logMid,forgotPassword);
router.delete('/deleteaccount',logMid,deleteAccount);

export default router;