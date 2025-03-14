import HostModel from "../models/HostModel.js";
import jwt from 'jsonwebtoken';
import sendEmail from "../services/sendEmail.js";
import bcrypt from "bcryptjs";
import env from "dotenv";
env.config();

const hostResetPasswordController = async (request, response) => {
    try {

        const { resetToken, email, password, confirmPassword } = request.body;
        const host = await HostModel.findOne({ hostEmail: email });

        if (!host) {
            return response.status(400).json({ message: "Host not found" });
        }
        if (password !== confirmPassword) {
            return response.status(400).json({ message: "Passwords do not match" });
        }

        const payload = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);

        if(payload.email === email){

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt)

            await HostModel.findOneAndUpdate(
                {hostEmail : email},
                {hostPassword : hashedPassword}
            )
            const emailSubject = "Moodygram Password Updated";
            const emailContent = `<html>
                            <body>
                                <p style="font-size:22px; color:#333;">
                                    Dear ${host.hostName}, Alert from Moodygram! 🚨
                                </p>
                                <p>Your Moodygram Password Was Changed</p>
                              
                                <p style="color:#777;">
                                    If you did not trigger this action, please contact us immediately at help@moodygram.com
                                </p>
                            </body>
                        </html> `

            await sendEmail(email, emailSubject, emailContent);
            return response.status(200).json({ message: "Password updated successfully" });
        }

   
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default hostResetPasswordController;