import { Button } from "@/components/ui/button";
import { Check, ClipboardIcon, CloudIcon, GaugeIcon, Menu, PuzzleIcon, UsersIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/root/Footer";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { SignedIn, SignedOut } from "@/components/ui/auth";
import { UserButton } from "@/components/ui/user";
import { PackageButton } from "@/components/dashboard/PaymentButtons";
import { packages } from "@/lib/packages";

const navigation = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "/about" }
];

export default async function Home() {
    return (
        <>
            <div className="bg-white relative overflow-hidden">
                <Image src="/images/home/beams.jpg" alt="" className="absolute -top-[1rem] left-1/2 -ml-[40rem] w-[163.125rem] max-w-none sm:-ml-[67.5rem] min-h-screen"
                    width={2610} height={1635}
                    priority={true}
                />
                <Sheet>
                    <header className="absolute inset-x-0 top-0 z-50">
                        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                            <div className="flex lg:flex-1">
                                <Link href="/" className="flex items-center justify-center gap-2">
                                    <Image
                                        className="h-8 w-auto"
                                        src="/logo.svg"
                                        alt=""
                                        height={32}
                                        width={32}
                                        priority={false}
                                    />
                                    <span className="text-lg font-semibold leading-6 hover:text-gray-600">
                                        Campus Sync
                                    </span>
                                </Link>
                            </div>
                            <div className="flex lg:hidden">
                                <SheetTrigger
                                    className="p-2 -mr-2 -ml-1 rounded-md hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                                >
                                    <Menu size={24} />
                                </SheetTrigger>
                            </div>
                            <div className="hidden lg:flex lg:gap-x-12">
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} className="text-sm leading-6 text-gray-900 hover:underline hover:underline-offset-4">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <SignedIn className="flex max-lg:flex-row items-center">
                                    <UserButton />
                                    <Button variant="link">
                                        <Link href="/dashboard">
                                            Dashboard
                                        </Link>
                                    </Button>
                                </SignedIn>
                                <SignedOut>
                                    <Link href="/login" className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 h-10 px-4 py-2">
                                        Log In
                                    </Link>
                                </SignedOut>
                            </div>
                        </nav>
                        <SheetContent>
                            <SheetTitle>
                                <Link href="/" className="flex items-center justify-center gap-2">
                                    <Image
                                        className="h-8 w-auto"
                                        src="/logo.svg"
                                        alt="Campus Sync Logo"
                                        height={32}
                                        width={32}
                                        priority={false}
                                    />
                                    <span className="text-lg font-semibold leading-6 hover:text-gray-600">
                                        Campus Sync
                                    </span>
                                </Link>
                            </SheetTitle>
                            <SheetDescription>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block my-6 text-sm font-semibold leading-6 text-gray-900 hover:underline hover:underline-offset-4"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <SignedIn className="flex max-lg:flex-row items-center">
                                    <UserButton />
                                    <Button variant="link">
                                        <Link href="/dashboard">
                                            Dashboard
                                        </Link>
                                    </Button>
                                </SignedIn>
                                <SignedOut>
                                    <Link href="/login" className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 h-10 px-4 py-2">
                                        Log In
                                    </Link>
                                </SignedOut>
                            </SheetDescription>
                        </SheetContent>
                    </header>
                </Sheet>
                <div className="relative isolate pt-14">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 bg-scroll"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-400 to-indigo-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] bg-scroll"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 38.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/100 bg-slate-100 hover:shadow-md">
                                Announcing our new dynamic feature.{" "}
                                <Link href="/" className="font-semibold text-indigo-600">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Elevate Your Learning Experience
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Discover our cutting-edge education SaaS platform, designed to revolutionize the way you learn and teach. AI Powered Quizzes, Interactive Lessons, Personalized Learning Experiences, Collaborative Tools and much more...
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 h-10 px-4 py-2" href="/login">
                                        Get Started
                                    </Link>
                                    <Button variant="outline" className="px-8 h-10 flex gap-2 group">
                                        Learn More
                                        <span
                                            className="group-hover:translate-x-3 transition-transform duration-300 ease-in-out"
                                        >
                                            <span aria-hidden="true" className="text-lg">&rarr;</span>
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <section className="w-full py-8 sm:py-10" id="features">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need for your organization</p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Super charge your organization with our powerful education SaaS platform. Our platform is designed to help you focus on what you do best, while we take care of the rest.
                                </p>
                            </div>
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
                                <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-12">
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <VideoIcon className="h-8 w-8 text-white mx-auto p-0.5"
                                                    stroke="currentColor" strokeWidth="1.25"
                                                />
                                            </div>
                                            Interactive Lessons
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600">Engage your students with interactive video lessons and multimedia content.</dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <ClipboardIcon className="h-8 w-8 text-white mx-auto p-0.5"
                                                    stroke="currentColor" strokeWidth="1.25"
                                                />
                                            </div>
                                            Assessment Tools
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600">Create quizzes and assignments to assess your students understanding.</dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <UsersIcon className="h-8 w-8 text-white mx-auto p-0.5"
                                                    stroke="currentColor" strokeWidth="1.25"
                                                />
                                            </div>
                                            Collaborative Learning
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600">Foster collaboration and teamwork among your students with group projects.</dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <GaugeIcon className="h-8 w-8 text-white mx-auto p-0.5"
                                                    stroke="currentColor" strokeWidth="1.25"
                                                />
                                            </div>
                                            Performance Analytics
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600">Track your students progress and performance with detailed analytics.</dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <PuzzleIcon className="h-8 w-8 text-white mx-auto p-0.5"
                                                    stroke="currentColor" strokeWidth="1.25"
                                                />
                                            </div>
                                            Customizable AI Based Quizzes
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600">
                                            Create custom quizzes with AI based question generation and adaptive learning.
                                        </dd>
                                    </div>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                <CloudIcon className="h-8 w-8 text-white mx-auto p-0.5"
                                                    stroke="currentColor" strokeWidth="1.25"
                                                />
                                            </div>
                                            Cloud Based Platform
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600">
                                            Access your content and data from anywhere, anytime with our cloud based platform.
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
                        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
                        <div className="mx-auto max-w-2xl lg:max-w-4xl">
                            <Image className="mx-auto h-12" src="https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg" alt=""
                                width={192} height={48}
                            />
                            <figure className="mt-10">
                                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                                    <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”</p>
                                </blockquote>
                                <figcaption className="mt-10">
                                    <Image className="mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""
                                        width={40} height={40}
                                    />
                                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                        <div className="font-semibold text-gray-900">Judith Black</div>
                                        <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-gray-900">
                                            <circle cx="1" cy="1" r="1" />
                                        </svg>
                                        <div className="text-gray-600">CEO of Workcation</div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </section>
                    <section>
                        <div className="py-24 sm:py-32">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">Trusted by the worlds leading organizations</h2>
                                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                                    <Image className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48" />
                                    <Image className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48" />
                                    <Image className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48" />
                                    <Image className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48" />
                                    <Image className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="text-gray-600 body-font overflow-hidden" id="pricing">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-col mb-20 mx-auto max-w-2xl lg:text-center">
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pricing</h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Whatever fits your needs, we have a plan for you. Choose from our flexible pricing options and get started today.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-around sm:px-10">
                                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
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
                                        <PackageButton packageType="LITE" />
                                        <p className="text-xs text-gray-500 mt-3">
                                            Suitable for small institutions and coaching centers.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
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
                                        <PackageButton packageType="STANDARD" />
                                        <p className="text-xs text-gray-500 mt-3">Suitable for medium sized institutions and universities.</p>
                                    </div>
                                </div>
                                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
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
                                        <PackageButton packageType="PREMIUM" />
                                        <p className="text-xs text-gray-500 mt-3">Suitable for large institutions and universities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="text-gray-600 body-font relative">
                        <div className="absolute inset-0 bg-gray-300">
                            <iframe width="100%" height="100%" title="map" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Hyderabad+(Campus%Sync)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                                style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
                            ></iframe>
                        </div>
                        <div className="container px-5 py-24 mx-auto flex">
                            <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
                                <p className="leading-relaxed mb-5 text-gray-600">Provide us with your feedback and suggestions. We would love to hear from you.</p>
                                <div className="relative mb-4">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out placeholder-slate-400" placeholder="lee@example.com" />
                                </div>
                                <div className="relative mb-4">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                    <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out placeholder-slate-400" placeholder="Your message here..."></textarea>
                                </div>
                                <Button variant="primary">Submit</Button>
                                <p className="text-xs text-gray-500 mt-3">We will get back to you as soon as possible.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div >
            <Footer />
        </>
    );
}