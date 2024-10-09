"use client";

import { SignUpFormOTPVerificationSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/lib/hooks/use-toast";
import { verifyOTP } from "@/actions/user/auth";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OTPPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const params = useSearchParams();

    const otpForm = useForm<z.infer<typeof SignUpFormOTPVerificationSchema>>({
        resolver: zodResolver(SignUpFormOTPVerificationSchema),
        defaultValues: {
            email: params.get("email") || "",
            otp: "",
        }
    });

    async function onSubmit(values: z.infer<typeof SignUpFormOTPVerificationSchema>) {
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
            let res = await verifyOTP({
                email: values.email,
                otp: values.otp,
            });
            if (res.status === 200) {
                toast({
                    title: "OTP verified successfully 🎉",
                    variant: "success",
                    description: "You can now login to your account",
                });
                router.push("/login");
            } else {
                toast({
                    title: "OTP verification failed! 😞",
                    variant: "destructive",
                    description: JSON.parse(JSON.stringify(res.message))
                });
            }
        }
        catch (err: any) {
            toast({
                title: "SignUp failed! 😞",
                variant: "destructive",
                description: JSON.parse(JSON.stringify(err.message))
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
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
                    Verify your Email
                </h2>
            </div>
            <div className="grid gap-4">
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onSubmit)}
                        className="grid gap-2"
                    >
                        <div className="grid gap-2">
                            <FormField
                                control={otpForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="m@example.com" {...field} />
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
                                control={otpForm.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
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
                                            Please enter the one-time password sent to your mail
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full" variant="primary">
                            {isLoading ? <Loader2Icon className="animate-spin" /> : "Complete Sign Up"}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">Log In</Link>
            </div>
        </div>
    );
};

export default OTPPage;