"use client";

import axios from "@/utils/axios";

const HomePage = () => {
    const handleConnectGoogleDrive = async () => {
        try {
            const response = await axios.get("/get-oauth-url");
            console.log(response.data);
            window.open(response.data.url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full  h-dvh flex items-center justify-center">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleConnectGoogleDrive}
            >
                Connect Google Drive
            </button>
        </div>
    );
};

export default HomePage;
