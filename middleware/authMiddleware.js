import jwt from 'jsonwebtoken';
import env from "dotenv";
env.config();

export const authMiddleware = async (request,response,next) => {
    try {
    //  const token = request.header("Authorization");
     const token = request.cookies.accessToken;
        if(!token){
            return response.status(401).json({message:"Authorization Denied"});
        }
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        request.user = payload.user;
        next();

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}