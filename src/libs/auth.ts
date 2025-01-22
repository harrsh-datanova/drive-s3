import { google } from "googleapis";
import { clientId, clientSecret, redirectUri } from "../env";

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
);

export default oauth2Client;
