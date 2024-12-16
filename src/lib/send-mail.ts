"use server";
import nodemailer from "nodemailer";

 const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASSWORD,
   },
 });

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}
