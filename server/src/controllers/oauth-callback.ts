import { Request, Response } from "express";
import { websiteUrl } from "../env";
import oauth2Client from "../libs/auth";
import User from "../models/User";

const OAuthCallbackController = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        if (!code) {
            throw new Error("Authorization code not provided.");
        }

        const { tokens } = await oauth2Client.getToken(code);
        if (!tokens.access_token) {
            throw new Error("Access token not found.");
        }

        const { email } = await oauth2Client.getTokenInfo(tokens.access_token);
        if (!email) {
            throw new Error("User not found.");
        }

        const existingUser = await User.findOne({
            userId: email,
        });

        if (existingUser) {
            await User.updateOne(
                {
                    userId: email,
                },
                {
                    tokens: {
                        ...existingUser.tokens,
                        ...tokens,
                    },
                }
            );

            res.cookie("userId", existingUser._id, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            res.redirect(websiteUrl);
            return;
        }

        const newUser = new User({
            userId: email,
            tokens,
        });
        await newUser.save();

        res.cookie("userId", newUser._id, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.redirect(websiteUrl);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Error",
        });
    }
};

export default OAuthCallbackController;
