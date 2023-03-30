import express from 'express';
import {forgotPassword, login , signup} from '../../controllers/v1/auth.js'
import logMid from '../../middlewares/logmiddleware.js'
const router = express.Router();

router.post('/login',logMid,login);
router.post('/signup',logMid,signup);
router.post('/forgotpassword',logMid,forgotPassword);

export default router;