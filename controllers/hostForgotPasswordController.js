import HostModel from "../models/hostModel";

const hostforgotPasswordController = async (request,response) => {
    try{
        const {email} = request.body;
        const host = await HostModel.findOne({hostEmail:email});
        if(!host){
            return response.status(400).json({message:"Host not found"});
        }
    }catch(error){
        response.status(500).json({message:error.message});
    }
}

export default hostforgotPasswordController;