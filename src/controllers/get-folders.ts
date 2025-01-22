import { Request, Response } from "express";
import { drive_v3, google } from "googleapis";
import setOAuthCredentials from "../utils/setOAuthCredentials";

const GetFoldersController = async (req: Request, res: Response) => {
    try {
        const oauth2Client = await setOAuthCredentials(req);

        const drive: drive_v3.Drive = google.drive({
            version: "v3",
            auth: oauth2Client,
        });

        const response = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.folder' and 'me' in owners and 'root' in parents",
            fields: "files(id, name)",
        });

        const folders = response.data.files || [];
        res.json(folders);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Error",
        });
    }
};

export default GetFoldersController;
