import axios from "@/utils/axios";
import { get } from "lodash";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
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

    if (isAuth) {
        console.log("User is authenticated");
        redirect("/");
    }

    return children;
};

export default PublicLayout;
