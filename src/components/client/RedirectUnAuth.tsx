import { checkForRole } from "@/lib/session";
import { redirect } from "next/navigation";

const RedirectUnAuth = async ({ checkIfUserIs }: { checkIfUserIs: "user" | "sub" | "admin" | "student" | "faculty" }) => {
    let isAuth = await checkForRole(checkIfUserIs);
    if (!isAuth) {
        redirect("/login");
    }
};

export default RedirectUnAuth;