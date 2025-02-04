import { Router } from "express";
import CheckAuthController from "./controllers/check-auth";
import GetOAuthUrlController from "./controllers/get-oauth-url";
import PingController from "./controllers/ping";
import SignInController from "./controllers/sign-in";

const router = Router();

router.get("/ping", PingController);
router.get("/check-auth", CheckAuthController);
router.post("/sign-in", SignInController);
router.get("/get-oauth-url", GetOAuthUrlController);

export default router;
