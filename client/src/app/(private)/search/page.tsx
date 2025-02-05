"use client";

import axios from "@/utils/axios";
import Link from "next/link";
import { useState } from "react";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState<
        {
            content: string;
            source_url: string;
        }[]
    >([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post("/get-embeddings", {
                query: searchQuery,
            });
            console.log(response.data, "<<< response.data");

            if (!response.data.data) {
                console.error("No data found");
            }

            const responseData: {
                content: string;
                source_url: string;
            }[] = [];

            for (const document of response.data.data) {
                responseData.push({
                    content: document.content,
                    source_url: document.source_url,
                });
            }

            setData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-dvh flex flex-col py-8 gap-8">
            <div className="max-w-sm w-full mx-auto flex flex-col gap-2">
                <input
                    autoFocus
                    value={searchQuery}
                    name="search-query"
                    id="search-query"
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-200 px-4 py-2 rounded"
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <ul className="w-full flex flex-col gap-4 px-8">
                {data.map((item, index) => (
                    <li className="" key={index}>
                        <Link href={item.source_url} target="_blank">
                            <p>{item.content}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
