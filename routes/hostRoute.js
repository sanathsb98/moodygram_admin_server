import createHostAccount  from "../controllers/hostController.js";
import verifyOTP from "../controllers/verifyOtpController.js";
import hostLoginController from "../controllers/hostLoginController.js";
import express from "express";

const router = express.Router();

router.post("/hostSignup",createHostAccount);
router.post("/verifyOtp",verifyOTP);
router.post("/hostSignin",hostLoginController)

export default router;