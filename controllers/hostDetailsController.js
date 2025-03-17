import HostDetailsModel from "../models/HostDetailsModel.js";

const hostDetailsController = async (request, response) => {
    try {
        const { hostId, hostAddress, hostBusinessName, hostBusinessCity, hostBusinessState, hostBusinessPinCode, hostBusinessProfilePic, hostBusinessBannerImg, hostBusinessEmail, hostBusinessPhone, hostBusinessAltPhone } = request.body;
        const hostDetails = new HostDetailsModel({
            hostId,
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
        })
        await hostDetails.save();
        response.status(201).json({ message: "Host Details saved successfully" });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default hostDetailsController;