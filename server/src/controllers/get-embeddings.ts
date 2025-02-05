import axios from "axios";
import { Request, Response } from "express";
import { carbonApiKey } from "../env";
import User from "../models/User";

const GetEmbeddingsController = async (req: Request, res: Response) => {
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

        const query = req.body.query;
        if (!query) {
            throw new Error("Invalid query");
        }

        const response = await axios.post(
            "https://api.carbon.ai/embeddings",
            {
                k: 5,
                query,
            },
            {
                headers: {
                    authorization: `Bearer ${carbonApiKey}`,
                    "customer-id": userId,
                },
            }
        );

        console.log(response.data, "<<< response.data");

        res.json({
            data: response.data.documents,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error",
        });
    }
};

export default GetEmbeddingsController;
