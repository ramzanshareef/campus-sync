import { verifyPaymentMakeSubAdmin } from "@/actions/payments/payment";
import Link from "next/link";
import { ContinueButton } from "./ContinueButton";

export default async function Page({ params }: { params: { sessionID: string } }) {
    let res = await verifyPaymentMakeSubAdmin(params.sessionID);
    return <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {res.status === 200 ? <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-gray-700 mb-6">
                    Your payment was processed successfully. You can now proceed to your dashboard.
                </p>
                <ContinueButton email={res.email as string} />
            </div> : <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    Payment Failed!
                </h1>
                <p className="text-gray-700 mb-6">
                    Your payment was not processed successfully. Please try again.
                </p>
                <Link href="/login"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transition duration-300"
                >
                    Go to Login
                </Link>
            </div>}
        </div>
    </>;
}