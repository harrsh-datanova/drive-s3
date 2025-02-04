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

export const websiteUrl = getEnv("WEBSITE_URL");

export const mongoUri = getEnv("MONGO_URI");
export const jwtSecret = getEnv("JWT_SECRET");

export const clientId = getEnv("GOOGLE_CLIENT_ID");
export const clientSecret = getEnv("GOOGLE_CLIENT_SECRET");
export const redirectUri = getEnv("GOOGLE_REDIRECT_URI");
export const scopes = getEnv("GOOGLE_SCOPES");

export const awsRegion = getEnv("AWS_REGION");
export const awsAccessKey = getEnv("AWS_ACCESS_KEY");
export const awsSecretKey = getEnv("AWS_SECRET_KEY");
export const awsBucket = getEnv("AWS_BUCKET");

export const carbonApiKey = getEnv("CARBON_API_KEY");
