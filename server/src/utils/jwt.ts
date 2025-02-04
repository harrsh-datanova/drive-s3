import jwt from "jsonwebtoken";
import { jwtSecret } from "../env";

const signJwt = (payload: any) => {
    return jwt.sign(payload, jwtSecret, {
        expiresIn: "1d",
    });
};

const verifyJwt = (token: string) => {
    return jwt.verify(token, jwtSecret);
};

export { signJwt, verifyJwt };
