import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendEmail from '../services/sendEmail.js';
import generateOTP from '../utility/generateOTP.js';
import HostModel from '../models/hostModel.js';

dotenv.config();

const createHostAccount = async (request, response) => {
    try {
        const { hostName, hostEmail, hostPhone, hostPassword } = request.body;

        console.log(request.body)
       

        const host = await HostModel.findOne({ hostEmail });

        if (host) {
            return response.status(400).json({ message: "Host already exists" });
        }

     

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hostHashedPassword = await bcrypt.hash(hostPassword,salt);

        const otpExpirationTime = new Date();
        otpExpirationTime.setMinutes(otpExpirationTime.getMinutes()+15); // set to 15 minutes

        const newHost = new HostModel({
            hostName,
            hostEmail,
            hostPhone,
            hostPassword: hostHashedPassword,
            hostAltPhone : "",
            hostAccessToken : "",
            hostRefreshToken : "",
            hostResetToken : "",
            hostEmailOTP : "",
            hostEmailOTPExpires : otpExpirationTime,
            hostAccountStatus : "active",
            hostVerified : false
        });
        await newHost.save();
        
        const otp = await generateOTP();
        const emailOTP = await HostModel.findOneAndUpdate({hostEmail:hostEmail},{hostEmailOTP:otp});
        emailOTP.save();
        const formattedOTP =  otp.replace(/(\d{2})(?=\d)/g, '$1 ');

        const emailSubject = "Moodygram Email Verification";
        const emailContent = ` <html>
                            <body>
                                <p style="font-size:22px; color:#333;">
                                    Hey ${hostName}, Welcome to <strong>MoodyGram</strong>! 🎉
                                </p>
                                <p>Your OTP for Email Verification is</p>
                                <p style="font-weight:bold;font-size:22px;color:#009252;">${formattedOTP}</p>
                                <p style="color:#777;">
                                    OTP valid for 10 minutes Only.. If you didn't request this, you can ignore this email.
                                </p>
                            </body>
                        </html>`;

           // send verification mail:
           await sendEmail(hostEmail,emailSubject,emailContent);
     
        response.status(200).json({ message: "Host account created successfully", newHost })
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default createHostAccount;
