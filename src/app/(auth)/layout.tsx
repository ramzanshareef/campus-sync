import Footer from "@/components/root/Footer";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-full h-full flex items-center justify-center m-0 p-0">
                <div className="hidden md:flex md:w-1/2">
                    <Image
                        src="/images/auth-page-side.png"
                        alt="Auth Page Side Image"
                        width="1920"
                        height="1080"
                        priority={false}
                        loading="lazy"
                        className="object-cover dark:brightness-[0.2] dark:grayscale max-w-full min-h-screen"
                    />
                </div>
                <div className="flex items-center justify-center min-h-screen w-full md:w-1/2">
                    <div className="mx-auto grid w-[350px] gap-6">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}