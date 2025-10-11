import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #4F46E5;">🔒 Your One-Time Password</h2>
        <p style="font-size: 16px; color: #333;">Use the following OTP to complete your verification:</p>
        <div style="font-size: 28px; font-weight: bold; color: #111; background: #f3f4f6; padding: 10px 20px; border-radius: 8px; display: inline-block; margin: 15px 0;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #555;">This code will expire in 1 minutes. Please do not share it with anyone.</p>
      </div>
    `,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send email');
  }
};
