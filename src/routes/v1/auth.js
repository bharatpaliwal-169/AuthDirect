import express from 'express';
import {forgotPassword, login , signup} from '../../controllers/v1/auth.js'

const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.post('/forgotpassword',forgotPassword);


export default router;