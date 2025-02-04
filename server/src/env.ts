import { config } from "dotenv";
config();

const getEnv = (
    key: string,
    {
        defaultValue,
    }: {
        defaultValue?: string;
    } = {}
) => {
    const value = process.env[key];

    if (!value) {
        if (defaultValue) {
            return defaultValue;
        }

        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const port = getEnv("PORT", {
    defaultValue: "8080",
});

export const mongoUri = getEnv("MONGO_URI");
export const jwtSecret = getEnv("JWT_SECRET");

export const carbonApiKey = getEnv("CARBON_API_KEY");
