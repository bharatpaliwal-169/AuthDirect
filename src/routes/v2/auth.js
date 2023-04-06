import express from 'express';
import {login,logout,signup,forgotPassword,verifyUser,deleteAccount,forgotPswdReq,
  changePasswordReq,changePassword
} from '../../controllers/v2/auth.js';
import logMid from '../../middlewares/logmiddleware.js';
import validator from '../../middlewares/validator.js';
const router = express.Router();

//customer routes

router.post('/login',logMid,validator,login);
router.post('/logout',logMid,logout);

router.post('/signup',logMid,validator,signup);
router.get('/verification',logMid,verifyUser);

router.post('/changepassword/request',logMid,changePasswordReq);
router.post('/changepassword',logMid,changePassword);

router.post('/forgot/request',logMid,forgotPswdReq);
router.get('/forgotpassword',logMid,forgotPassword);

router.delete('/deleteaccount',logMid,deleteAccount);

export default router;