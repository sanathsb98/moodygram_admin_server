import { SMTPClient } from 'emailjs';
import dotenv from 'dotenv';
dotenv.config();


const sendEmail = async(email, emailSubject, emailContent) => {

    const client = new SMTPClient({
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        port: 587,
        tls: true
    });

    client.send(
        {
            text: "Your email client does not support HTML emails.",
            from: 'itssanathsb@gmail.com',
            to: email,
            subject: `${emailSubject}`,
            attachment: [
                {
                    data : emailContent,
                    alternative: true
                }
            ]
        },
        (err, message) => {
            if (err) {
                console.error("Email sending failed:", err);
            } else {
                console.log("Email sent successfully:", message);
            }
        }
    );
};

export default sendEmail;
