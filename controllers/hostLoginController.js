import HostModel from "../models/HostModel.js";
import { generateTokens } from "../utility/generateTokens.js";
import bcrypt from 'bcryptjs';

const hostLoginController = async (request,response) => {
    try{
        const {email,password} = request.body;
        const host = await HostModel.findOne({hostEmail:email});
        if(!host){
            return response.status(400).json({message:"Host not found"});
        }
       const passwordValid = await bcrypt.compare(password,host.hostPassword)
         if(!passwordValid){
              return response.status(400).json({message:"Invalid Password"});
         }
        // generate new access and refresh token:
        const {accessToken,refreshToken} = generateTokens(email);

        // set the tokens as cookies:
        response.cookie('accessToken',accessToken,{
            httpOnly : true,
            secure : true,
            maxAge : 15*60*1000 // 15 minutes
        })

        response.cookie('refreshToken',refreshToken,{
            httpOnly : true,
            secure : true,
            maxAge : 7*24*60*60*1000 // 7 days
        })

        // update the tokens in the database:
        const newToken = await HostModel.findOneAndUpdate(
            {hostEmail : email},
            {
                hostAccessToken:accessToken,
                hostRefreshToken:refreshToken
            },
            {new : true} // this ensures the updated document is returned
        )

        return response.status(200).json({message:"Host Logged In Successfully",newToken});

    }catch(error){
        response.status(500).json({message:error.message});
    }
}
    export default hostLoginController;