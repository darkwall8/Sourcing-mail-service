import dotenv from "dotenv";
const nodemailer = require("nodemailer");
dotenv.config();

export const sendEmail = async (object: string, messages: string, receiver: string) => {

    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_PROVIDER,
        auth: {
          user: process.env.MAIL_SENDER_EMAIL,
          pass: process.env.MAIL_SENDER_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.MAIL_SENDER_EMAIL,
        to: receiver,
        subject: object,
        text: messages,
    };

    await transporter.sendMail(mailOptions);

}