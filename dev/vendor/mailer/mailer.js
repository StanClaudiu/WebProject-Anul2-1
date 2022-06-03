import nodemailer from 'nodemailer'
import "dotenv/config"

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
});

const SendMail = (to, subject, text) => {

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}

export default SendMail