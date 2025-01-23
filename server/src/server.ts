import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import connectDB from "./db";
import { port } from "./env";
import router from "./router";

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use("/api/v1", router);

app.listen(port, async () => {
    await connectDB();
    console.log(`Server is Fire at http://localhost:${port}`);
});
