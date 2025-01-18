"use client";

import { createCourse } from "@/actions/faculty/course";
import { useToast } from "@/lib/hooks/use-toast";
import { newCourseFormSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { IUser } from "@/types/user";

export const AddCourseForm = ({ user }: { user: IUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const newCourseForm = useForm<z.infer<typeof newCourseFormSchema>>({
        resolver: zodResolver(newCourseFormSchema),
        defaultValues: {
            name: "",
            description: "",
            facultyID: user._id.toString(),
            photo: "",
        },
    });

    async function onSubmit(values: z.infer<typeof newCourseFormSchema>) {
        try {
            setIsLoading(true);
            let res = await createCourse(values);
            if (res.status === 200) {
                toast({
                    title: "Course Created! 🎉",
                    variant: "success",
                    description: "Course has been created successfully.",
                });
            } else {
                toast({
                    title: "Course Creation Failed! 😞",
                    variant: "destructive",
                    description: res.message,
                });
            }
        } catch (err: any) {
            let error = JSON.parse(JSON.stringify(err, null, 2));
            toast({
                title: "Course Creation Failed! 😞",
                variant: "destructive",
                description: error.errors
                    ? error.errors.map((e: any) => e.longMessage).join(", ")
                    : "An unknown error occurred.",
            });
        } finally {
            newCourseForm.reset();
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create a New Course 📚
            </h2>
            <div className="w-full grid gap-4">
                <Form {...newCourseForm}>
                    <form
                        onSubmit={newCourseForm.handleSubmit(onSubmit)}
                        className="grid gap-2"
                    >
                        <FormField
                            control={newCourseForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter course name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={newCourseForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter course description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={newCourseForm.control}
                            name="photo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Photo URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter photo URL"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-fit"
                            variant="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2Icon className="animate-spin" />
                            ) : (
                                "Create Course"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
