import { Request, Response } from "express";
import { scopes } from "../env";
import oauth2Client from "../libs/auth";

const ConnectController = (req: Request, res: Response) => {
    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: JSON.parse(scopes),
        });
        res.send(`<a href="${authUrl}">Connect Google Drive</a>`);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Error",
        });
    }
};

export default ConnectController;
