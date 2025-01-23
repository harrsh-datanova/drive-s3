import { Request, Response } from "express";

const PingController = async (req: Request, res: Response) => {
    try {
        res.json({
            message: "Pong",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error",
        });
    }
};

export default PingController;
