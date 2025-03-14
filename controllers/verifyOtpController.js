import HostModel from "../models/hostModel.js";
import { generateTokens } from "../utility/generateTokens.js";

const verifyOTP = async (request,response) => {
    try{
         const {email,emailOtp} = request.body;
         const host = await HostModel.findOne({hostEmail : email});

         if(!host){
                return response.status(400).json({message:"Host not found"});
         }

         if(host.hostEmailOTP === emailOtp && host.hostEmailOTPExpires > Date.now()){
            await HostModel.findOneAndUpdate(
                {hostEmail : email},
                {hostVerified : true}
            )
 
            // setting access token and refresh token:
            const {accessToken,refreshToken} = generateTokens(email)

            response.cookie('accessToken',accessToken,{
                httpOnly:true,
                secure:true,
                maxAge: 15*60*1000 // 15 minutes
            });

            response.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                secure:true,
                maxAge: 7*24*60*60*1000 // 7 days
            });

            const newToken = await HostModel.findOneAndUpdate(
                 { hostEmail: email },
                 {
                     hostAccessToken: accessToken,
                     hostRefreshToken: refreshToken
                 }
             )

            response.status(200).json({message:"Email Verified Successfully",newToken});

         }
            else{
                response.status(400).json({message:"OTP Expired or Invalid OTP"});
            }
    }catch(error){
        response.status(500).json({message:error.message});
    }
}

export default verifyOTP; 