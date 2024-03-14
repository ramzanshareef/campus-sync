import { checkAuth } from "@/lib/session";

interface SignedInProps {
    children: React.ReactNode;
}

const SignedIn = async ({ children }: SignedInProps) => {
    const isAuth = await checkAuth();
    return isAuth ? <>{children}</> : null;
};

const SignedOut = async ({ children }: SignedInProps) => {
    const isAuth = await checkAuth();
    return !isAuth ? <>{children}</> : null;
};

export { SignedIn, SignedOut };