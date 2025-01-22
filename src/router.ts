import { Router } from "express";
import ConnectController from "./controllers/connect";
import GetFoldersController from "./controllers/get-folders";
import GetSubFoldersController from "./controllers/get-sub-folders";
import OAuthCallbackController from "./controllers/oauth-callback";
import PingController from "./controllers/ping";

const router = Router();

router.get("/ping", PingController);
router.get("/connect", ConnectController);
router.get("/oauth-callback", OAuthCallbackController);
router.get("/folders", GetFoldersController);
router.get("/folders/:folderName", GetSubFoldersController);

export default router;
