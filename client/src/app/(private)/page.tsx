import axios from "@/utils/axios";
import { cookies } from "next/headers";
import FoldersList, { IFolder } from "./FoldersList";

const HomePage = async () => {
    let folders: IFolder[] = [];

    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const foldersResponse = await axios.get("/folders", {
            headers: {
                Cookie: cookieHeader,
            },
        });
        folders = foldersResponse.data;
    } catch (error) {
        console.error(error);
    }

    return <FoldersList folders={folders} />;
};

export default HomePage;
