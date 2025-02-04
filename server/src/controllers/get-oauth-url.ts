import axios from "axios";
import { Request, Response } from "express";
import User from "../models/User";
import { carbonApiKey } from "../env";

const GetOAuthUrlController = async (req: Request, res: Response) => {
    try {
        const userId = req.cookies.userId;
        if (!userId) {
            throw new Error("Invalid user");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Invalid user");
        }

        const accessToken = user.accessToken;
        if (!accessToken) {
            throw new Error("Invalid user");
        }

        const response = await axios.post(
            "https://api.carbon.ai/integrations/oauth_url",
            {
                service: "GOOGLE_DRIVE",
                automatically_open_file_picker: true,
                connecting_new_account: true,
                enable_file_picker: true,
            },
            {
                headers: {
                    authorization: `Bearer ${carbonApiKey}`,
                    "customer-id": userId,
                },
            }
        );

        res.json({
            url: response.data.oauth_url,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error",
        });
    }
};

export default GetOAuthUrlController;
