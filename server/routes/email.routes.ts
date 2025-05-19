import express from 'express'
import { send_email } from '../controllers/Email.controller';

const EmailRouter = express.Router();

// Route pour envoyer un message
EmailRouter.post('/send', send_email);

export default EmailRouter;
