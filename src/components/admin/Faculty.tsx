"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { createFacultySchema } from "@/schemas/faculty";
import { createFaculty } from "@/actions/admin/faculties";

export const AddFaculties = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof createFacultySchema>>({
        resolver: zodResolver(createFacultySchema),
        defaultValues: {
            name: "",
            email: "",
        }
    });

    async function onSubmit(values: z.infer<typeof createFacultySchema>) {
        setIsLoading(true);
        let res = await createFaculty({
            faculty: {
                name: values.name,
                email: values.email,
            }
        });
        setIsLoading(false);
        form.reset();
        if (res.status === 200) {
            toast({
                title: "Faculty Added Successfully 🎉",
                variant: "success",
                description: values.name + " has been added to the database",
            });
        } else {
            toast({
                title: "Failed to Add Faculty 😔",
                variant: "destructive",
                description: JSON.parse(JSON.stringify(res.message)),
            });
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center">
                <h2 className="text-2xl my-4 flex flex-col">
                    Add Faculty
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Faculty Name"
                                            {...field}
                                            onChange={(e) => {
                                                form.setValue("name", e.target.value);
                                                form.setValue("email", e.target.value.split(" ").join("").toLowerCase().length > 0 ? e.target.value.split(" ").join("").toLowerCase() + "@faculty.cs.com" : "");
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem
                                    className="opacity-70 cursor-not-allowed"
                                    title="Email ID is auto-generated based on Name"
                                >
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email ID"
                                            disabled={true}
                                            className="disabled:opacity-70"
                                            defaultValue={form.watch("email")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row items-center gap-2">
                            <Button variant="primary" size={"default"} type="submit" disabled={isLoading}>
                                {isLoading ?
                                    <Loader2Icon className="animate-spin" size={18} />
                                    : "Add Faculty"}
                            </Button>
                            <Button variant="destructive" size={"default"} type="reset" onClick={() => form.reset()}
                                disabled={isLoading}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};