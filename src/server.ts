import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { drive_v3, google } from "googleapis";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const REDIRECT_URI = "http://localhost:8000/oauth2callback";
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

export const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    res.send(`<a href="${authUrl}">Connect Google Drive</a>`);
});

app.get("/oauth2callback", async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;

        if (!code) {
            throw new Error("Authorization code not provided.");
        }

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        res.json(tokens);
    } catch (error) {
        console.error("Error exchanging authorization code:", error);
        res.status(500).send("Authentication failed.");
    }
});

app.get("/folders", async (req: Request, res: Response) => {
    try {
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
        console.error("Error fetching folders:", error);
        res.status(500).send("Failed to fetch folders.");
    }
});

app.get("/folders/:folderName", async (req: Request, res: Response) => {
    try {
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
        console.error("Error fetching subfolders:", error);
        res.status(500).send("Failed to fetch subfolders.");
    }
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
