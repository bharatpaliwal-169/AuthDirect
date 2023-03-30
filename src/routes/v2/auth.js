import express from 'express';
import {login,signup,forgotPassword,verifyEmail} from '../../controllers/v2/auth.js';
import logMid from '../../middlewares/logmiddleware.js';
const router = express.Router();

//customer routes
router.post('/login',logMid,login);
router.post('/signup',logMid,signup);
router.post('/forgotpassword',logMid,forgotPassword);
router.post('/verifyemail',logMid,verifyEmail);

// admin level routes
// getAllUsers
//createModUser
//ModifyMODuser put/patch
//deleteModUser
//BlacklistUsers

export default router;