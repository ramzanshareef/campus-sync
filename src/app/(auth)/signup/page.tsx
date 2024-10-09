"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "@/schemas/user";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignup } from "@/actions/user/auth";

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const signUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
        try {
            setIsLoading(true);
            let allowedEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "tomorjerry.com"];
            let emailDomain = (values.email as string)?.split("@")[1];
            if (!allowedEmailDomains.includes(emailDomain)) {
                toast({
                    title: "Only Gmail, Yahoo, Hotmail and Outlook domains are allowed",
                    variant: "destructive",
                });
                setIsLoading(false);
                return;
            }
            let res = await userSignup({
                name: values.name,
                email: values.email,
                password: values.password,
            });
            if (res.status === 200) {
                toast({
                    title: "Please verify your email 😊",
                    variant: "success",
                    description: "OTP sent to email",
                });
                router.push("/signup/verify?email=" + values.email);
            } else {
                toast({
                    title: "SignUp failed! 😞",
                    variant: "destructive",
                    description: JSON.parse(JSON.stringify(res.message)),
                });
            }
        }
        catch (err: any) {
            toast({
                title: "SignUp failed! 😞",
                variant: "destructive",
                description: err.message,
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
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for an Account
                    </h2>
                </div>
                <div className="grid gap-4">
                    <Form {...signUpForm}>
                        <form onSubmit={signUpForm.handleSubmit(onSubmit)}
                            className="grid gap-2"
                        >
                            <div className="grid gap-2">
                                <FormField
                                    control={signUpForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Max Robinson" {...field} />
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
                                    control={signUpForm.control}
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
                                    control={signUpForm.control}
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
                                {isLoading ? <Loader2Icon className="animate-spin" /> : "Sign Up"}
                            </Button>
                        </form>
                    </Form>
                    {/* <Button variant="destructive" className="w-full" onClick={() => signUpWith("oauth_google")}>
                        Sign up with Google
                    </Button> */}
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4">Log In</Link>
                </div>
            </div>
        </>
    );
}