import { Request, Response } from "express";
import { sendEmail } from "../services/EmailService";
import dotenv from "dotenv";
dotenv.config();


export const send_email = async (req: Request, res: Response) => {
  const {  email, object, messages } = req.body;

  try {
    await sendEmail(object, messages, email);
    res.send({message: "Email send seccuessfully !"})
  } catch (error) {
    console.log(error);
      res.status(500).json({ error: "Failed to send email" });
  }
};