"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createStudentSchema } from "@/schemas/student";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createStudent } from "@/actions/admin/create";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export const AddStudents = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof createStudentSchema>>({
        resolver: zodResolver(createStudentSchema),
        defaultValues: {
            name: "",
            department: "",
            semester: "",
            rollNumber: 0,
        }
    });

    async function onSubmit(values: z.infer<typeof createStudentSchema>) {
        setIsLoading(true);
        let res = await createStudent({
            student: {
                name: values.name,
                department: values.department,
                semester: parseInt(values.semester),
                rollNumber: values.rollNumber,
            }
        });
        setIsLoading(false);
        form.resetField("department");
        form.reset();
        if (res.status === 200) {
            toast({
                title: "Student Added 🎉",
                variant: "success",
                description: values.name + " has been added to the database",
            });
        } else {
            toast({
                title: "Failed to add student 😞",
                variant: "destructive",
                description: JSON.parse(JSON.stringify(res.message)),
            });
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center">
                <h2 className="text-2xl my-4 flex flex-col">
                    Add Student
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
                                        <Input placeholder="Enter Student Name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Enter Student Department" className="placeholder-gray-400" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="CIVIL">CIVIL</SelectItem>
                                            <SelectItem value="CSE">CSE</SelectItem>
                                            <SelectItem value="ECE">ECE</SelectItem>
                                            <SelectItem value="EEE">EEE</SelectItem>
                                            <SelectItem value="IT">IT</SelectItem>
                                            <SelectItem value="MECH">MECH</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Semester</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Semester" {...field} type="number" min={1} max={8} />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rollNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Roll Number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter Roll Number" {...field} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row items-center gap-2">
                            <Button variant="primary" size={"default"} type="submit" disabled={isLoading}>
                                {isLoading ?
                                    <Loader2Icon className="animate-spin" size={18} />
                                    : "Add Student"}
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