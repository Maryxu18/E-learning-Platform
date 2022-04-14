import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, html) => {
  try {
    //const transporter = nodemailer.createTransport()

    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
    });

    return true;
  } catch (error) {
    return false;
  }
};
