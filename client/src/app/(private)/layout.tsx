import axios from "@/utils/axios";
import { get } from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import PageLoader from "./PageLoader";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
    let isAuth = false;

    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const userAuth = await axios.get("/check-auth", {
            headers: {
                Cookie: cookieHeader,
            },
        });
        isAuth = get(userAuth, "data.isAuth", false);
    } catch (error) {
        console.error(error);
        alert("Failed to check auth");
    }

    if (!isAuth) {
        console.log("User is not authenticated");
        redirect("/connect");
    }

    return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export default PrivateLayout;
