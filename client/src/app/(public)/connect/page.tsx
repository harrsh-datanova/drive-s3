import axios from "@/utils/axios";
import { get } from "lodash";
import Link from "next/link";

const ConnectPage = async () => {
    let authUrl = "";

    try {
        const authUrlResponse = await axios.get("/connect");
        authUrl = get(authUrlResponse, "data.authUrl", "");
    } catch (error) {
        console.error(error);
        alert("Failed to fetch connection url");
    }
    return (
        <div>
            <Link href={authUrl}>Connect with Google</Link>
        </div>
    );
};

export default ConnectPage;
