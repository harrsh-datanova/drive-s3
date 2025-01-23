"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import RightArrow from "./RightArrow";

const FoldersList = ({ folders, folderPath }: IFoldersListProps) => {
    const router = useRouter();

    const [selectedFolders, setSelectedFolders] = useState<IFolder[]>([]);

    const handleFolderSelection = (folder: IFolder) => {
        if (selectedFolders.includes(folder)) {
            setSelectedFolders((prev) => {
                return prev.filter((f) => f !== folder);
            });
        } else {
            setSelectedFolders([...selectedFolders, folder]);
        }
    };

    return (
        <div className="container mx-auto">
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

                    <p>
                        Selected folders:{" "}
                        {selectedFolders
                            .map((folder) => folder.name)
                            .join(", ")}
                    </p>
                </Fragment>
            ) : (
                <p>No folders found</p>
            )}
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
