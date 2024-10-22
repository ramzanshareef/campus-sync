"use client";

import { CreateCollegeSchema } from "@/schemas/college";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { FileRejection, useDropzone } from "react-dropzone";
import { ArrowUp01Icon, Loader2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import { createCollege } from "@/actions/admin";
import { useRouter } from "next/navigation";

export const CreateCollegeForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof CreateCollegeSchema>>({
        resolver: zodResolver(CreateCollegeSchema),
        defaultValues: {
            name: "",
            location: "",
            logo: undefined
        }
    });

    async function onSubmit(values: z.infer<typeof CreateCollegeSchema>) {
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("location", values.location);
        formData.append("logo", values.logo);
        let res  = await createCollege(formData);
        if (res.status === 200) {
            form.reset();
            toast({
                title: "College Created",
                description: "Your college has been created successfully",
                variant: "success",
            });
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: res.message,
                variant: "destructive",
            });
        }
    }

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length > 0) {
            toast({
                title: "Invalid File",
                description: "Please upload a valid image file",
                variant: "destructive",
            });
        }
        const file = acceptedFiles[0];
        Object.assign(file, { preview: URL.createObjectURL(file) });
        form.setValue("logo", file);
    }, [form]); // eslint-disable-line react-hooks/exhaustive-deps

    const removeFile = () => {
        form.setValue("logo", undefined as any);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/png": [".png", ".jpeg", ".jpg"],
        },
        maxSize: 1024 * 10000, // 10MB
        maxFiles: 1,
        onDrop
    });

    interface ExtendedFile extends File {
        preview: string;
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>College Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="College Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the name of your college
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Location" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the location of your college
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ }) => (
                            <FormItem>
                                <FormLabel>Logo</FormLabel>
                                <FormControl>
                                    <div className="min-w-full flex flex-col md:flex-row gap-4">
                                        {
                                            form.watch("logo") ? (
                                                <div className="flex flex-col md:flex-row items-center min-w-full gap-4">
                                                    <Image
                                                        src={(form.watch("logo") as ExtendedFile)?.preview as string}
                                                        alt={form.watch("logo")?.name as string}
                                                        width={100}
                                                        height={100}
                                                        onLoad={() => {
                                                            URL.revokeObjectURL((form.watch("logo") as ExtendedFile)?.preview as string);
                                                        }}
                                                        className="h-60 md:w-auto rounded-md transition duration-300 ease-in-out hover:border-gray-500 z-0 md:max-w-[50%] max-md:w-full"
                                                    />
                                                    <div className="flex flex-row items-center gap-2">
                                                        <p className="text-sm text-gray-500">
                                                            {form.watch("logo")?.name.substring(0, 20) + "..."}
                                                        </p>
                                                        <XIcon className="w-5 h-5 bg-red-500 text-white p-1 cursor-pointer rounded-full"
                                                            onClick={removeFile}
                                                        />
                                                    </div>
                                                </div>
                                            ) :
                                                <div
                                                    {...getRootProps({
                                                        className: "min-w-full border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:border-gray-500"
                                                    })}
                                                >
                                                    <input {...getInputProps()} />
                                                    <div className="flex flex-col items-center justify-center gap-4">
                                                        <ArrowUp01Icon className="w-5 h-5 fill-current" />
                                                        {isDragActive ? (
                                                            <p>Drop the files here ...</p>
                                                        ) : (
                                                            <p>Drag & drop files here, or click to select files</p>
                                                        )}
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Please upload the logo of your college
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-2 flex flex-row gap-2">
                        <Button type="submit" variant="primary">
                            {form.formState.isSubmitting ? <Loader2Icon className="animate-spin" /> : "Create College"}
                        </Button>
                        <Button type="reset" variant="destructive" onClick={() => { form.reset(); }}>Reset</Button>
                    </div>
                </form>
            </Form>
        </>
    );
};