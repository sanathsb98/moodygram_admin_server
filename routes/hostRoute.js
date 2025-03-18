import createHostAccount  from "../controllers/hostController.js";
import verifyOTP from "../controllers/verifyOtpController.js";
import hostLoginController from "../controllers/hostLoginController.js";
import express from "express";
import hostforgotPasswordController from "../controllers/hostForgotPasswordController.js";
import hostResetPasswordController from "../controllers/hostResetPassword.js";
import hostDetailsController from "../controllers/hostDetailsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import hostDetailsEditController from "../controllers/hostDetailsEditController.js";
import hostDeleteController from "../controllers/hostDeleteController.js";
import refreshToken from "../utility/refreshToken.js";
import hostVerifyDeleteController from "../controllers/hostVerifyDeleteHostController.js";
import hostLogoutController from "../controllers/hostLogoutController.js";

const router = express.Router();

router.post("/hostSignup",createHostAccount);
router.post("/verifyOtp",verifyOTP);
router.post("/hostSignin",hostLoginController)
router.post("/hostForgotPassword",hostforgotPasswordController)
router.post("/hostResetPassword",hostResetPasswordController)
router.post("/uploadHostDetails",authMiddleware, hostDetailsController)
router.post("/editHostDetails",authMiddleware,hostDetailsEditController)
router.post("/deleteHostAccount",authMiddleware,hostDeleteController)
router.post("/verifyHostDeletion",hostVerifyDeleteController)
router.post("/refreshToken",refreshToken);
router.post("/hostLogout",hostLogoutController)

export default router;