import { Request, Response } from "express";
import oauth2Client from "../libs/auth";
import User from "../models/User";

const OAuthCallbackController = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;

        if (!code) {
            throw new Error("Authorization code not provided.");
        }

        console.log(code);

        const { tokens } = await oauth2Client.getToken(code);
        console.log("Received tokens:", tokens);

        const existingUser = await User.findOne({
            userId: code,
        });

        if (existingUser) {
            await User.updateOne(
                {
                    userId: code,
                },
                {
                    tokens,
                }
            );

            res.cookie("userId", code, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            res.json({
                message: "User already exists. Updated tokens.",
            });
            return;
        }

        const newUser = new User({
            userId: code,
            tokens,
        });
        await newUser.save();

        res.cookie("userId", code, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.json({
            message: "User created.",
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Error",
        });
    }
};

export default OAuthCallbackController;
