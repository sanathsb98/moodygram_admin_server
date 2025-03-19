import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateTokens } from "../utility/generateTokens.js";
import HostModel from "../models/HostModel.js";
dotenv.config()

const googleAuthController = async (request, response) => {

    const { code } = request.body;

    console.log(code)

    if (!code) {
        return response.status(400).json({ error: "Authorization code is required" });
    }
    try{
        const {data} = await axios.post("https://oauth2.googleapis.com/token",{
            client_id : process.env.GOOGLE_CLIENT_ID,
            client_secret : process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri : process.env.GOOGLE_CALLBACK_URL,
            grant_type : "authorization_code",
            code
        });
    
        const {access_token} = data;
    
        const {data:userInfo} = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`)

        const {email,name,picture} = userInfo;

        //check if user exists in database:
        const host = await HostModel.findOne({hostEmail:email});
        if(!host){
            const hostModel = new HostModel({
                hostName : name,
                hostEmail : email,
                hostPhone : "",
                hostPassword: "",
                hostAltPhone : "",
                hostAccessToken : "",
                hostRefreshToken : "",
                hostResetToken : "",
                hostEmailOTP : "",
                hostEmailOTPExpires : "",
                hostAccountStatus : "active",
                hostVerified : true, //true for google users
                provider : "google",
                hostProfilePicture : picture
            })
            await hostModel.save()
        }

        const {accessToken,refreshToken} = await generateTokens(email)

        const newToken = await HostModel.findOneAndUpdate(
            { hostEmail: email },
            {
                hostAccessToken: accessToken,
                hostRefreshToken: refreshToken
            },
            {new:true}
        )

        response.cookie('accessToken',accessToken,{
            httpOnly : true,
            secure : true,
            maxAge : 15*60*1000 //15 minutes
        })

        response.cookie('refreshToken',refreshToken,{
            httpOnly : true,
            secure : true,
            maxAge : 7*24*60*60*1000 //7 days
        })

        return response.status(200).json({message:"Host Logged In Successfully Through Google",newToken});

    }catch(error){
        response.status(500).json({error:error})
    }

}

export default googleAuthController;