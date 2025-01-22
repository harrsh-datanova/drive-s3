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

export const clientId = getEnv("GOOGLE_CLIENT_ID");
export const clientSecret = getEnv("GOOGLE_CLIENT_SECRET");
export const redirectUri = getEnv("GOOGLE_REDIRECT_URI");
export const scopes = getEnv("GOOGLE_SCOPES");
export const port = getEnv("PORT", {
    defaultValue: "8080",
});
