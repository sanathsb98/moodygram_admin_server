import jwt from 'jsonwebtoken';
import HostModel from '../models/HostModel.js';
import { generateAccessToken, verifyToken } from './generateTokens.js';
import dotenv from 'dotenv';
dotenv.config();

export const refreshToken = async (request, response) => {
    try {
        const {refreshToken} = request.body;

        if(!refreshToken){
            return response.status(401).json({message:"Authorization Denied"});
        }

        const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if(!payload){
            return response.status(401).json({message:"Invalid Token"});
        }

        const host = await HostModel.findOne({hostEmail: payload.email});
        console.log

        if(!host){
            return response.status(401).json({message:"Host not found"});
        }
        
        const accessToken = generateAccessToken(host.hostEmail);
        response.cookie('accessToken', accessToken, {httpOnly: true,secure:true,maxAge: 15*60*1000});

        await HostModel.findOneAndUpdate
        (
            {hostEmail: payload.email},
            {
                hostAccessToken: accessToken,
            }
        );
        
        return response.status(200).json({message : "Access token generated successfully",accessToken : accessToken});

        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default refreshToken;


