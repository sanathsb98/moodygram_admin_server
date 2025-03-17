import HostModel from "../models/HostModel.js";
import jwt from 'jsonwebtoken';
import sendEmail from "../services/sendEmail.js";

const hostDeleteController = async (request, response) => {
    try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).json({ message: "All fields are required" });
        }
        const host = await HostModel.findOne({ hostEmail: email });
        if (!host) {
            return response.status(400).json({ message: "Host not found" });
        }
        const deleteToken = jwt.sign({email}, process.env.DELETE_TOKEN_SECRET, { expiresIn: '15m' });
        const emailSubject = "Moodygram is Sad to See You Go 😢";
        const emailContent =  `<html>
                            <body>
                                <p style="font-size:22px; color:#333;">
                                    Hey ${host.hostName}, 
                                </p>
                                <p>Please click the link below to delete your account!</p>
                                <a href="${process.env.CLIENT_URL}/resetpassword/${deleteToken}" style="text-decoration:none;color:#009252;font-size:18px;">Delete Account</a>
                                <p>If you did not trigger this action, please contact us immediately at help@moodygram.com </p>
                            </body>
                        </html>`

        await sendEmail(email, emailSubject, emailContent);
        return response.status(200).json({ message: `Delete account link sent to ${email}` })


    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default hostDeleteController;