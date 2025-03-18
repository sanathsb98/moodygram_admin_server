import HostModel from "../models/HostModel.js";

const hostLogoutController = async (request, response) => {
    try {
        const accessToken  = request.cookies.accessToken;
        console.log("Access Token:", accessToken);

        if (!accessToken) {
            return response.status(400).json({ message: "No active session found" });
        }

        // Find host using access token
        const host = await HostModel.findOne({ hostAccessToken: accessToken });

        if (!host) {
            return response.status(400).json({ message: "Invalid session or user already logged out" });
        }

        // Update host tokens in DB
        await HostModel.findOneAndUpdate(
            { hostAccessToken: accessToken }, // Find by token
            { hostAccessToken: "", hostRefreshToken: "" }, // Clear tokens
            { new: true }
        );

        // Clear cookies correctly
        response.clearCookie("accessToken", { httpOnly: true, secure: true });
        response.clearCookie("refreshToken", { httpOnly: true, secure: true });

        return response.status(200).json({ message: "Logout Successful" });

    } catch (error) {
        console.error("Logout Error:", error);
        return response.status(500).json({ error: error.message });
    }
};

export default hostLogoutController;
