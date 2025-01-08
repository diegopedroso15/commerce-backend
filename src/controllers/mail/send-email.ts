const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'diego.pedroso15@gmail.com',
    pass: 'phds onnr qhro vugc',
  },
});

export const sendEmailController = async (req: any, res: any) => {
  const { recipient, subject, message } = req.body;
  const mailOptions = {
    from: 'diego.pedroso15@gmail.com',
    to: recipient,
    subject: subject,
    text: message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email.' });
  }
};