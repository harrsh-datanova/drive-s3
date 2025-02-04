import { Request, Response } from "express";

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
