import HostModel from "../models/HostModel.js";
import { verifyToken } from "../utility/generateTokens.js";
import HostDetailsModel from "../models/HostDetailsModel.js";
import env from "dotenv";
env.config()

const hostVerifyDeleteController = async(request,response) => {
    try{
     const authHeader = request.headers.authorization;
     console.log(authHeader)

     if(!authHeader || !authHeader.startsWith("Bearer ")){
        return response.status(401).json({message:"Authorization token required"})
     }

     const deleteToken = authHeader.split(" ")[1]
     console.log(deleteToken)

     const valid = verifyToken(deleteToken,process.env.DELETE_TOKEN_SECRET)

     if(!valid){
        return response.status(401).json({message:"invalid token"})
     }

     const host = await HostModel.findOne({hostEmail:valid.email})

     if(!host){
        return response.status(401).json({message:"host not found"})
     }

     const hostId = host._id;

     await HostDetailsModel.deleteMany({hostId})
     await HostModel.deleteOne({_id:hostId})

     return response.status(200).json({message:`Host Account ${host.hostEmail} Deleted Successfully`})

    }catch(error){
        response.status(500).json({error:error})
    }
}

export default hostVerifyDeleteController;