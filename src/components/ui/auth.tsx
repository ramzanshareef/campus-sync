import { checkAuth } from "@/lib/session";

interface SignedInProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const SignedIn = async ({ children, ...props }: SignedInProps) => {
    const isAuth = await checkAuth();
    return isAuth ? <div {...props}> {children} </div> : null;
};

const SignedOut = async ({ children, ...props }: SignedInProps) => {
    const isAuth = await checkAuth();
    return !isAuth ? <div {...props}> {children} </div> : null;
};

export { SignedIn, SignedOut };