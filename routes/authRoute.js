import express from "express";
import passport from "../auth/googleAuth.js";
import googleAuthController from "../controllers/googleAuthController.js";

const router = express.Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/dashboard");
})
router.post("/auth/google", googleAuthController)

export default router;