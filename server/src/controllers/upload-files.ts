import { Request, Response } from "express";
import { drive_v3, google } from "googleapis";
import { awsBucket } from "../env";
import s3 from "../libs/S3";
import { Upload } from "@aws-sdk/lib-storage";
import setOAuthCredentials from "../utils/setOAuthCredentials";

const UploadFilesController = async (req: Request, res: Response) => {
    try {
        const oauth2Client = await setOAuthCredentials(req);
        const userId = req.cookies.userId;

        const folderIds = req.body.folderIds;
        if (!folderIds || !Array.isArray(folderIds)) {
            res.status(400).json({
                message: "Invalid request.",
            });
            return;
        }

        const folderQuery = folderIds
            .map((id) => `'${id}' in parents`)
            .join(" or ");

        const drive: drive_v3.Drive = google.drive({
            version: "v3",
            auth: oauth2Client,
        });

        const listResponse = await drive.files.list({
            q: `(${folderQuery}) and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
            fields: "files(id, name)",
        });

        const files = listResponse.data.files || [];
        if (files.length === 0) {
            res.json({
                message: "No files found in the folder.",
            });
            return;
        }

        const currentDate = Date.now();
        const folderPath = `${userId}/${currentDate}`;
        const uploadedFiles: string[] = [];

        await Promise.all(
            files.map(async (file) => {
                if (!file.id || !file.name) {
                    return;
                }

                const fileStream = await drive.files.get(
                    {
                        fileId: file.id,
                        alt: "media",
                    },
                    {
                        responseType: "stream",
                    }
                );

                const s3Key = `${folderPath}/${file.name}`;
                console.log(`Uploading ${file.name} to S3 at ${s3Key}...`);

                const upload = new Upload({
                    client: s3,
                    params: {
                        Bucket: awsBucket,
                        Key: s3Key,
                        Body: fileStream.data,
                        ACL: "public-read",
                        ContentType: fileStream.headers["content-type"],
                    },
                });

                await upload.done();

                const fileUrl = `https://${awsBucket}.s3.amazonaws.com/${s3Key}`;

                console.log(`Uploaded ${file.name} to S3 at ${fileUrl}`);
                uploadedFiles.push(fileUrl);
            })
        );

        res.json({
            message: "Files uploaded to S3 successfully.",
            files: uploadedFiles,
        });
    } catch (error) {
        console.error("Error uploading files to S3:", error);

        res.status(400).json({
            message: "Error",
        });
    }
};

export default UploadFilesController;
