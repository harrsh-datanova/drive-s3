"use client";

import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
    const router = useRouter();

    const [email, setEmail] = useState("harrsh@yopmail.com");
    const [password, setPassword] = useState("1234");

    const handleSignUp = async () => {
        try {
            await axios.post("/sign-in", {
                email,
                password,
            });

            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full  h-dvh flex items-center justify-center">
            <div className="container max-w-sm mx-auto flex flex-col gap-2">
                <input
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 px-4 py-2 rounded"
                />

                <input
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 px-4 py-2 rounded"
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSignUp}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUp;
