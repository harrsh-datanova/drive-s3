import { S3Client } from "@aws-sdk/client-s3";
import { awsAccessKey, awsRegion, awsSecretKey } from "../env";

const s3 = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey,
    },
});

export default s3;
