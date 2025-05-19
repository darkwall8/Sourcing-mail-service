import { Request, Response } from "express";
import { sendEmail } from "../services/EmailService";
import dotenv from "dotenv";
dotenv.config();


export const send_email = async (req: Request, res: Response) => {
  const {  email, object, messages } = req.body;

  try {
    await sendEmail(object, messages, email);
  } catch (error) {
    console.log(error);
      res.status(500).json({ error: "Erreur lors de l'envoie des mails" });
  }
};