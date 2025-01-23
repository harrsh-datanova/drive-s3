"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import RightArrow from "./RightArrow";
import axios from "@/utils/axios";
import PageLoader from "./PageLoader";

const FoldersList = ({ folders, folderPath }: IFoldersListProps) => {
    const router = useRouter();

    const [selectedFolders, setSelectedFolders] = useState<IFolder[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFolderSelection = (folder: IFolder) => {
        if (selectedFolders.includes(folder)) {
            setSelectedFolders((prev) => {
                return prev.filter((f) => f !== folder);
            });
        } else {
            setSelectedFolders([...selectedFolders, folder]);
        }
    };

    const handleUploadFiles = async () => {
        try {
            setIsLoading(true);

            const folderIds = selectedFolders.map((folder) => folder.id);
            const uploadedFilesResponse = await axios.post("/upload-files", {
                folderIds,
            });

            setUploadedFiles(uploadedFilesResponse.data.files);
            setSelectedFolders([]);
        } catch (error) {
            console.error(error);
            alert("An error occurred while uploading files.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            {isLoading ? <PageLoader /> : null}

            {folderPath &&
                folderPath.map((folder, index) => (
                    <span key={index}>
                        <Link
                            href={`/folders/${folderPath.slice(0, index + 1).join("/")}`}
                        >
                            {decodeURIComponent(folder)}
                        </Link>

                        {index < folderPath.length - 1 && " > "}
                    </span>
                ))}

            {folders.length ? (
                <Fragment>
                    <p>
                        Select the folders you want to upload your files to. You
                        can select multiple folders.
                    </p>

                    <ul className="mt-4 mb-2">
                        {folders.map((folder) => {
                            return (
                                <li key={folder.id}>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="folderName"
                                            id="folderName"
                                            value={folder.id}
                                            checked={selectedFolders.includes(
                                                folder
                                            )}
                                            onChange={() =>
                                                handleFolderSelection(folder)
                                            }
                                        />
                                        <p>{folder.name}</p>

                                        <span
                                            className="cursor-pointer rounded-full bg-blue-500 text-white p-1"
                                            onClick={() => {
                                                router.push(
                                                    folderPath
                                                        ? `/folders/${[
                                                              ...folderPath,
                                                              folder.name,
                                                          ].join("/")}`
                                                        : `/folders/${folder.name}`
                                                );
                                            }}
                                        >
                                            <RightArrow />
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {selectedFolders.length ? (
                        <Fragment>
                            <p className="mt-4">
                                Selected folders:{" "}
                                {selectedFolders
                                    .map((folder) => folder.name)
                                    .join(", ")}
                            </p>
                            <button
                                className="rounded-md px-4 py-1 text-white bg-blue-600 "
                                onClick={handleUploadFiles}
                            >
                                Download files
                            </button>
                        </Fragment>
                    ) : null}
                </Fragment>
            ) : (
                <p>No folders found</p>
            )}

            {uploadedFiles.length ? (
                <Fragment>
                    <h2 className="mt-4">Uploaded files</h2>

                    <ul>
                        {uploadedFiles.map((file, index) => (
                            <li key={index} className="list-disc ml-4">
                                <a href={file} target="_blank" rel="noreferrer">
                                    {file.split("/").pop()}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            ) : null}
        </div>
    );
};

export default FoldersList;

interface IFoldersListProps {
    folders: Array<IFolder>;
    folderPath?: string[];
}

export interface IFolder {
    id: string;
    name: string;
}
