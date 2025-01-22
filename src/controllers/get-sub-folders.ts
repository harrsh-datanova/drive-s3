import { Request, Response } from "express";
import { google } from "googleapis";
import oauth2Client from "../libs/auth";
import User from "../models/User";

const GetSubFoldersController = async (req: Request, res: Response) => {
    try {
        const userId = req.cookies.userId;
        if (!userId) {
            throw new Error("User not found.");
        }

        const tokens = await User.findOne({
            userId,
        });
        if (!tokens) {
            throw new Error("User not found.");
        }

        oauth2Client.setCredentials(tokens.tokens);

        const folderName = req.params.folderName;
        const drive = google.drive({
            version: "v3",
            auth: oauth2Client,
        });

        const folderResponse = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and 'me' in owners and name='${folderName}'`,
            fields: "files(id, name)",
        });

        const folder = folderResponse.data.files?.[0];
        if (!folder) {
            throw new Error("Folder not found.");
        }

        const subfolderResponse = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and '${folder.id}' in parents`,
            fields: "files(id, name)",
        });

        const subfolders = subfolderResponse.data.files || [];
        res.json(subfolders);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Error",
        });
    }
};

export default GetSubFoldersController;
