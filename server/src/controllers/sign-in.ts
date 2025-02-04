import axios from "axios";
import { Request, Response } from "express";
import { carbonApiKey } from "../env";
import User from "../models/User";
import { comparePassword, encryptPassword } from "../utils/manage-password";

const SignInController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        let userId = "";

        const existingUser = await User.findOne({
            email,
        });
        if (!existingUser) {
            const encryptedPassword = await encryptPassword(password);
            const newUser = new User({
                email,
                password: encryptedPassword,
                accessToken: "",
                refreshToken: "",
            });
            await newUser.save();
            userId = newUser._id;
        } else {
            const isPasswordValid = await comparePassword(
                password,
                existingUser.password
            );
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            userId = existingUser._id;
        }

        if (!userId) {
            throw new Error("Invalid user");
        }

        console.log(userId, "<<< userId");

        const tokens = await axios.get(
            "https://api.carbon.ai/auth/v1/access_token",
            {
                headers: {
                    authorization: `Bearer ${carbonApiKey}`,
                    "customer-id": userId,
                },
            }
        );

        await User.findByIdAndUpdate(userId, {
            accessToken: tokens.data.access_token,
            refreshToken: tokens.data.refresh_token,
        });

        res.cookie("userId", userId, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.json({
            message: "Success",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error",
        });
    }
};

export default SignInController;
