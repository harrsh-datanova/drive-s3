import axios from "@/utils/axios";
import { cookies } from "next/headers";
import FoldersList, { IFolder } from "../../FoldersList";

const SubFoldersListPage = async ({ params }: ISubFoldersListPageProps) => {
    const paramsResponse = await params;
    const folderPath = paramsResponse.folderPath;
    const lastFolder = [...folderPath].pop();

    console.log(paramsResponse);

    let folders: IFolder[] = [];

    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const foldersResponse = await axios.get(`/folders/${lastFolder}`, {
            headers: {
                Cookie: cookieHeader,
            },
        });
        folders = foldersResponse.data;
    } catch (error) {
        console.error(error);
    }

    return <FoldersList folders={folders} folderPath={folderPath} />;
};

export default SubFoldersListPage;

interface ISubFoldersListPageProps {
    params: Promise<{
        folderPath: string[];
    }>;
}
