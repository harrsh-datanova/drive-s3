import { Request, Response } from "express";
import { scopes } from "../env";
import oauth2Client from "../libs/auth";

const CheckAuthController = (req: Request, res: Response) => {
    try {
        const userId = req.cookies.userId;
        res.json({
            isAuth: !!userId,
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Error",
        });
    }
};

export default CheckAuthController;
