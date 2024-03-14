/* eslint-disable no-unused-vars */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInFormSchema } from "@/schemas/user";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const signInForm = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
        try {
            setIsLoading(true);
            // const signInAttempt = await signIn.create({
            //     identifier: values.email,
            //     password: values.password
            // });
            // if (signInAttempt.status === "complete") {
            //     await setActive({ session: signInAttempt.createdSessionId });
            //     toast({
            //         title: "Signin Successful 🎉",
            //         variant: "success",
            //     });
            //     router.push(query.get("redirect_url") || "/");
            // }
            // else {
            //     let error = JSON.parse(JSON.stringify(signInAttempt, null, 2));
            //     toast({
            //         title: "Signin failed! 😞",
            //         variant: "destructive",
            //         description: error.errors.map((e: any) => e.longMessage).join(", "),
            //     });
            // }
        }
        catch (err: any) {
            let error = JSON.parse(JSON.stringify(err, null, 2));
            toast({
                title: "Signin failed! 😞",
                variant: "destructive",
                description: error.errors.map((e: any) => e.longMessage).join(", "),
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                    <Image src="/logo.svg" alt="logo" height={10} width={10}
                        style={{ width: "8rem" }}
                        priority={true}
                        loading="eager"
                        onClick={() => router.push("/")}
                        className="cursor-pointer"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log In to your Account</h2>
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
                            <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
                                {isLoading ? <Loader2Icon className="animate-spin" /> : "Log In"}
                            </Button>
                        </form>
                    </Form>
                    {/* <OauthSignIn /> */}
                </div>
                <div className="text-center text-sm">
                    Donot have an acccount? &nbsp;
                    <Link href="/signup" className="underline underline-offset-4">Sign Up</Link>
                </div>
            </div>
        </>
    );
}