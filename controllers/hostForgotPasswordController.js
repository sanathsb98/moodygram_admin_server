import HostModel from "../models/HostModel.js";
import jwt from 'jsonwebtoken';
import sendEmail from "../services/sendEmail.js";

const hostforgotPasswordController = async (request,response) => {
    try{
        const {email} = request.body;
        const host = await HostModel.findOne({hostEmail:email});

        if(!host){
            return response.status(400).json({message:"Host not found"});
        }

        const resetToken = jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '15m' })
        await HostModel.findOneAndUpdate(
            { hostEmail: email },
            { hostResetToken: resetToken }
        )

        const emailSubject = "Moodygram Password Reset";
        const emailContent = ` <html>
                            <body>
                                <p style="font-size:22px; color:#333;">
                                    Hey ${host.hostName}, 
                                </p>
                                <p>As requested, click the reset button below to reset your Moodygram password!</p>
                                <a href="${process.env.CLIENT_URL}/resetpassword/${resetToken}" style="text-decoration:none;color:#009252;font-size:18px;">Reset Password</a>
                            </body>
                        </html>`;

        await sendEmail(email, emailSubject, emailContent);

        return response.status(200).json({ message: `Reset password link send to ${email}` })

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default hostforgotPasswordController;
