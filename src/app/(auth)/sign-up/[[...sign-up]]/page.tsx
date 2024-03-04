"use client";

import { useSignUp, useAuth, SignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OAuthStrategy } from "@clerk/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormOTPVerificationSchema, SignUpFormSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useToast } from "@/lib/hooks/use-toast";
import { useState, useEffect } from "react";

export default function Page() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [verifying, setVerifying] = useState(false);
    const router = useRouter();
    const query = useSearchParams();
    const { isSignedIn } = useAuth();
    const [missing, setMissing] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    const otpForm = useForm<z.infer<typeof SignUpFormOTPVerificationSchema>>({
        resolver: zodResolver(SignUpFormOTPVerificationSchema),
        defaultValues: {
            otp: "",
        }
    });

    async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setVerifying(true);
        }
        catch (err: any) {
            let error = JSON.parse(JSON.stringify(err, null, 2));
            toast({
                variant: "destructive",
                title: "Sign Up Failed",
                description: error.errors.map((e: any) => e.longMessage).join(", "),
            });
        }
    }

    async function onOTPSubmit(values: z.infer<typeof SignUpFormOTPVerificationSchema>) {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: values.otp,
            });
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                toast({
                    title: "Sign Up Successful 🎉",
                    variant: "success",
                });
                window.location.href = query.get("redirect_url") ? query.get("redirect_url") as string : "/dashboard";

            }
            else {
                completeSignUp.status === "abandoned" ?
                    toast({
                        title: "Sign Up Failed",
                        variant: "destructive",
                        description: "Verification code is incorrect.",
                    })
                    :
                    toast({
                        title: "Sign Up Failed",
                        variant: "destructive",
                        description: "An error occurred. Please try again later.",
                    });
            }
        }
        catch (err: any) {
            let error = JSON.parse(JSON.stringify(err, null, 2));
            toast({
                title: "Sign Up Failed",
                variant: "destructive",
                description: error.errors.map((e: any) => e.longMessage).join(", "),
            });
        }
    }

    useEffect(() => {
        if (document.location.href.includes("/continue")) setMissing(true);
    }, []);

    if (verifying) {
        return (
            <>
                <div className="w-full h-full flex items-center justify-center m-0 p-0 ">
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
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                                <Image src="/logo.svg" alt="logo" height={10} width={10}
                                    style={{ width: "8rem" }}
                                    priority={true}
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Verify your email with OTP code
                                </h2>
                            </div>
                            <div className="mx-auto">
                                <Form {...otpForm}>
                                    <form onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                                        className="mx-auto"
                                    >
                                        <FormField
                                            control={otpForm.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>One-Time Password</FormLabel>
                                                    <FormControl>
                                                        <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={0} />
                                                                <InputOTPSlot index={1} />
                                                                <InputOTPSlot index={2} />
                                                                <InputOTPSlot index={3} />
                                                                <InputOTPSlot index={4} />
                                                                <InputOTPSlot index={5} />
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Please enter the OTP sent to your email.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full mt-2" variant="primary">
                                            Complete Sign Up
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!isSignedIn) {
        const signUpWith = (strategy: OAuthStrategy) => {
            return signUp?.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sign-up/sso-callback",
                redirectUrlComplete: query.get("redirect_url") || "/",
            });
        };
        return (
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
                    {missing ? <SignUp /> :
                        <div className="mx-auto grid w-[350px] gap-6">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                                <Image src="/logo.svg" alt="logo" height={10} width={10}
                                    style={{ width: "8rem" }}
                                    priority={true}
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign up for an Account
                                </h2>
                            </div>
                            <div className="grid gap-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}
                                        className="grid gap-2"
                                    >
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="firstName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                First Name
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Max" {...field} />
                                                            </FormControl>
                                                            <FormMessage
                                                                className="text-sm"
                                                            />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="lastName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Last Name
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Robinson" {...field} />
                                                            </FormControl>
                                                            <FormMessage
                                                                className="text-sm"
                                                            />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="m@example.com"
                                                                {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-sm" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="********"
                                                                {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-sm" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" variant="primary">
                                            Create an account
                                        </Button>
                                    </form>
                                </Form>
                                <Button variant="destructive" className="w-full" onClick={() => signUpWith("oauth_google")}>
                                    Sign up with Google
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/sign-in" className="underline underline-offset-4">Sign In</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
    else return router.push("/");
}