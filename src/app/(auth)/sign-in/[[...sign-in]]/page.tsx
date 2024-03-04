"use client";
import * as React from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import OauthSignIn from "./Outh";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInFormSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";

export default function SignInForm() {
    const { toast } = useToast();
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();
    const query = useSearchParams();
    const { isSignedIn } = useAuth();
    const signInForm = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
        console.log(values);
        if (!isLoaded) return;
        try {
            const signInAttempt = await signIn.create({
                identifier: values.email,
                password: values.password
            });
            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                toast({
                    title: "Sign In Successful",
                    variant: "success",
                });
                router.push(query.get("redirect_url") || "/");
            }
            else {
                let error = JSON.parse(JSON.stringify(signInAttempt, null, 2));
                toast({
                    title: "Sign In Failed",
                    variant: "destructive",
                    description: error.errors.map((e: any) => e.longMessage).join(", "),
                });
            }
        }
        catch (err: any) {
            let error = JSON.parse(JSON.stringify(err, null, 2));
            toast({
                title: error.errors.map((e: any) => e.longMessage).join(", "),
                variant: "destructive",
                description: error.errors.map((e: any) => e.longMessage).join(", "),
            });
        }
    }
    if (!isSignedIn) {
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
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                                <Image src="/logo.svg" alt="logo" height={10} width={10}
                                    style={{ width: "8rem" }}
                                    priority={true}
                                    loading="eager"
                                    onClick={() => router.push("/")}
                                    className="cursor-pointer"
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign In to your Account</h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm grid gap-4">
                                <Form {...signInForm}>
                                    <form onSubmit={signInForm.handleSubmit(onSubmit)}
                                        className="grid gap-2"
                                    >
                                        <div className="grid gap-2">
                                            <FormField
                                                control={signInForm.control}
                                                name="email"
                                                render={({ field }: { field: any }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Email Adress
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="email"
                                                                placeholder="m@example.com"
                                                                {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-sm" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={signInForm.control}
                                                name="password"
                                                render={({ field }: { field: any }) => (
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
                                            Sign In
                                        </Button>
                                    </form>
                                </Form>
                                <OauthSignIn />
                            </div>
                            <div className="text-center text-sm">
                                Donot have an acccount? &nbsp;
                                <Link href="/sign-up" className="underline underline-offset-4">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else return router.back();
}