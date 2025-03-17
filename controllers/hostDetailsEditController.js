import HostDetailsModel from "../models/HostDetailsModel.js";

const hostDetailsEditController = async (request, response) => {
    try{
        const { hostId, hostAddress, hostBusinessName, hostBusinessCity, hostBusinessState, hostBusinessPinCode, hostBusinessProfilePic, hostBusinessBannerImg, hostBusinessEmail, hostBusinessPhone, hostBusinessAltPhone } = request.body;
        const hostDetails = await HostDetailsModel.findOneAndUpdate(
            { hostId },
            {
                hostAddress,
                hostBusinessName,
                hostBusinessCity,
                hostBusinessState,
                hostBusinessPinCode,
                hostBusinessProfilePic,
                hostBusinessBannerImg,
                hostBusinessEmail,
                hostBusinessPhone,
                hostBusinessAltPhone
            }
        )
        response.status(201).json({ message: "Host Details updated successfully",hostId});
    }catch(error){
        response.status(500).json({ message: error.message });
    }
}

export default hostDetailsEditController;