import { Router } from "express";
import CheckAuthController from "./controllers/check-auth";
import ConnectController from "./controllers/connect";
import GetFoldersController from "./controllers/get-folders";
import GetSubFoldersController from "./controllers/get-sub-folders";
import OAuthCallbackController from "./controllers/oauth-callback";
import PingController from "./controllers/ping";
import UploadFilesController from "./controllers/upload-files";

const router = Router();

router.get("/ping", PingController);
router.get("/check-auth", CheckAuthController);
router.get("/connect", ConnectController);
router.get("/oauth-callback", OAuthCallbackController);
router.get("/folders", GetFoldersController);
router.get("/folders/:folderName", GetSubFoldersController);
router.post("/upload-files", UploadFilesController);

export default router;
