import express from 'express'
import {sendEmail} from './sendEmail.js';

const router = express.Router();

router.post('/mail',sendEmail);

export default router;