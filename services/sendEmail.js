// import { SMTPClient } from 'emailjs';
// import dotenv from 'dotenv';
// dotenv.config();


// const sendEmail = async(email, emailSubject, emailContent) => {

//     const client = new SMTPClient({
//         user: process.env.EMAIL_USER,
//         password: process.env.EMAIL_PASSWORD,
//         host: 'smtp.gmail.com',
//         port: 587,
//         tls: true
//     });

//     client.send(
//         {
//             text: "Your email client does not support HTML emails.",
//             from: 'itssanathsb@gmail.com',
//             to: email,
//             subject: `${emailSubject}`,
//             attachment: [
//                 {
//                     data : emailContent,
//                     alternative: true
//                 }
//             ]
//         },
//         (err, message) => {
//             if (err) {
//                 console.error("Email sending failed:", err);
//             } else {
//                 console.log("Email sent successfully:", message);
//             }
//         }
//     );
// };

// export default sendEmail;

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (email, emailSubject, emailContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD, // Use App Password (not regular password)
            },
        });

        const mailOptions = {
            from: `"Sanath SB" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: emailSubject,
            html: emailContent, // Use HTML for better formatting
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        return { success: false, message: "Failed to send email" };
    }
};

export default sendEmail;

