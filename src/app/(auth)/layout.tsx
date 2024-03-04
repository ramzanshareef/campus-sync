import Footer from "@/components/root/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}