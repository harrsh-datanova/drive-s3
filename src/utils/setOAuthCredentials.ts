import { Request } from "express";
import User from "../models/User";
import oauth2Client from "../libs/auth";

const setOAuthCredentials = async (req: Request) => {
    const userId = req.cookies.userId;
    if (!userId) {
        throw new Error("User not found.");
    }

    const userData = await User.findById(userId);
    if (!userData) {
        throw new Error("User not found.");
    }

    const tokens = userData.tokens;

    let isTokenExpired = false;
    if (tokens.expiry_date) {
        const expiryDate = new Date(tokens.expiry_date);
        isTokenExpired = expiryDate.getTime() < Date.now();
    }

    if (isTokenExpired) {
        oauth2Client.setCredentials({
            refresh_token: tokens.refresh_token,
        });
        const { credentials } = await oauth2Client.refreshAccessToken();

        tokens.access_token = credentials.access_token;
        tokens.expiry_date = credentials.expiry_date;
        tokens.refresh_token = credentials.refresh_token;

        await User.updateOne(
            {
                _id: userId,
            },
            {
                tokens: {
                    ...tokens,
                    ...credentials,
                },
            }
        );
    }

    oauth2Client.setCredentials(tokens);

    return oauth2Client;
};

export default setOAuthCredentials;
