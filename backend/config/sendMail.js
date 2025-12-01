import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PAAS,
  },
})

const sendMail = async (to, otp) => {
  transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        
        <p>Your One-Time Password (OTP) is:</p>
        <h3 style="background: #f3f3f3; padding: 10px; width: fit-content;">
          ${otp}
        </h3>

        <p>This OTP is valid for <b>5 minutes</b>.  
        If you did not request a password reset, please ignore this email.</p>

        <br/>
        <p>Regards,</p>
        <p><b>Your Support Team</b></p>
      </div>
    `,
  });
};


export default sendMail