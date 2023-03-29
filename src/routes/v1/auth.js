import express from 'express';
import {forgotPassword, login , signup} from '../../controllers/v1/auth.js'
import logMid from '../../middlewares/logmiddleware.js'
const router = express.Router();

router.post('/v1/auth/login',logMid,login);
router.post('/v1/auth/signup',logMid,signup);
router.post('/v1/auth/forgotpassword',logMid,forgotPassword);

export default router;