import { Check } from "lucide-react";
import { getSession } from "@/lib/session";
import { PackageButton } from "@/components/dashboard/PaymentButtons";
import { packages } from "@/lib/packages";

export async function UserDashboardHome() {
    const session = await getSession();
    return <>
        <div className="text-gray-600">
            <div className="p-5 mx-auto">
                <div className="flex flex-col mb-2 mx-auto max-w-2xl lg:text-center">
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Please select a package to continue.
                    </h1>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Whatever fits your needs, we have a plan for you. Choose from our flexible pricing options and get started today.
                    </p>
                </div>
                <div className="text-red-500 font-semibold text-center">
                    Note: Please give your present email address in the payment window (if not prefilled) to get the package activated on this account else it will be activated on the email address used for payment.
                </div>
                <div className="flex flex-wrap justify-around">
                    <div className="p-4 xl:w-1/4 md:w-1/2 w-full px-2">
                        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden hover:border-indigo-500">
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{packages[0].package}</h2>
                            <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                                ₹{packages[0].price.toLocaleString("en-IN")}
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Upto 100 students & 10 faculty
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Customizable AI based quizzes (upto 5 per faculty)
                            </p>
                            <PackageButton packageType="LITE" email={session?.user?.email} />
                            <p className="text-xs text-gray-500 mt-3">
                                Suitable for small institutions and coaching centers.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 xl:w-1/4 md:w-1/2 w-full px-2">
                        <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                            <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{packages[1].package}</h2>
                            <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                ₹{packages[1].price.toLocaleString("en-IN")}
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Upto 500 students & 40 faculty
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Customizable AI based quizzes (upto 10 per faculty)
                            </p>
                            <p className="flex items-center text-gray-600 mb-6">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Performance Analytics
                            </p>
                            <PackageButton packageType="STANDARD" email={session?.user?.email} />
                            <p className="text-xs text-gray-500 mt-3">Suitable for medium sized institutions and universities.</p>
                        </div>
                    </div>
                    <div className="p-4 xl:w-1/4 md:w-1/2 w-full px-2">
                        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden hover:border-indigo-500">
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{packages[2].package}</h2>
                            <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                <span>₹{packages[2].price.toLocaleString("en-IN")}</span>
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Unlimited students & faculty
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Customizable AI based quizzes (unlimited per faculty)
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                Performance Analytics
                            </p>
                            <p className="flex items-center text-gray-600 mb-6">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                    <Check className="h-3 w-3" />
                                </span>
                                AI Personalized Learning Experiences
                            </p>
                            <PackageButton packageType="PREMIUM" email={session?.user?.email} />
                            <p className="text-xs text-gray-500 mt-3">Suitable for large institutions and universities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}