"use client";

import { DataTable } from "@/components/ui/DataTable";
import { IStudentView } from "@/types/student";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon, Loader2Icon, MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStudentSchema } from "@/schemas/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteStudent, updateStudent } from "@/actions/admin/students";
import { useToast } from "@/lib/hooks/use-toast";

const columns: ColumnDef<IStudentView>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "department",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Branch
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "semester",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Year (Semester)
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <span>
                    {Math.ceil(row.original.semester / 2)} ({row.original.semester})
                </span>
            );
        },
    },
    {
        accessorKey: "rollNo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Roll No
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <Actions row={row} />;
        },
    },
];

export const StudentsTable = ({ students }: { students: IStudentView[] }) => {
    return (
        <>
            <DataTable columns={columns} data={students} />
        </>
    );
};

const Actions = ({ row }: { row: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const student = row.original;
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof updateStudentSchema>>({
        resolver: zodResolver(updateStudentSchema),
        defaultValues: {
            name: student.name,
            email: student.email,
            department: student.department,
            semester: student.semester,
            rollNumber: student.rollNo,
        }
    });
    async function onSubmit(values: z.infer<typeof updateStudentSchema>) {
        setIsLoading(true);
        let res = await updateStudent({
            student: {
                _id: student._id,
                name: values.name,
                email: values.email,
                department: values.department,
                semester: values.semester,
                rollNo: values.rollNumber,
            }
        });
        setIsLoading(false);
        setIsOpen(false);
        form.resetField("department");
        form.reset();
        if (res.status === 200) {
            toast({
                title: "Student Updated 🎉",
                variant: "success",
                description: values.name + " has been updated in the database",
            });
        } else {
            toast({
                title: "Failed to update student 😞",
                variant: "destructive",
                description: JSON.parse(JSON.stringify(res.message)),
            });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 p-0 focus:outline-none focus-visible:outline-none focus:border-collapse focus-visible:border-collapse focus-visible:border-none">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <AlertDialog open={isOpen} onOpenChange={setIsOpen} defaultOpen={false}>
                    <AlertDialogTrigger asChild onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(true);
                    }}>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <PencilIcon className="w-4 h-4 text-indigo-600" /> Edit
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="sm:max-w-[425px]">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit Student</AlertDialogTitle>
                            <AlertDialogDescription>
                                Edit the details of the student.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type="text"
                                                    placeholder="Enter Student Name"
                                                    {...field}
                                                    defaultValue={student.name}
                                                    value={form.watch("name") || student.name}
                                                    onChange={field.onChange}
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
                                            title="Email ID is auto-generated based on Roll Number"
                                        >
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Student Email ID"
                                                    type="email"
                                                    disabled={true}
                                                    defaultValue={form.watch("email") || student.email}
                                                    value={form.watch("email") || student.email}
                                                    onChange={field.onChange}
                                                />
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
                                            <Select
                                                defaultValue={student.department || field.value}
                                                value={form.watch("department") || student.department}
                                                onValueChange={field.onChange}
                                            >
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
                                                <Input placeholder="Enter Semester" {...field}
                                                    type="number"
                                                    min={1}
                                                    max={8}
                                                    defaultValue={student.semester}
                                                    value={form.watch("semester") || student.semester}
                                                    onChange={(e: any) => {
                                                        form.setValue("semester", parseInt(e.target.value));
                                                    }}
                                                />
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
                                                <Input
                                                    type="number"
                                                    placeholder="Enter Roll Number"
                                                    {...field}
                                                    minLength={10}
                                                    maxLength={10}
                                                    defaultValue={student.rollNo}
                                                    value={form.watch("rollNumber") || student.rollNo}
                                                    onChange={(e: any) => {
                                                        form.setValue("rollNumber", parseInt(e.target.value));
                                                        form.setValue("email", e.target.value.length > 0 ? e.target.value + "@student.cs.com" : "");
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button variant="primary"
                                        size={"default"}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ?
                                            <Loader2Icon className="animate-spin" size={18} />
                                            : "Save changes"}
                                    </Button>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen} defaultOpen={false}>
                    <AlertDialogTrigger asChild onClick={(e) => {
                        e.preventDefault();
                        setIsEditOpen(true);
                    }}>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Trash2Icon className="w-4 h-4 text-red-600" /> Delete
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Student</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete <b>{student.name}</b> with Roll Number <b>{student.rollNo}</b>?
                                <br />
                                <span className="text-red-600">Note: This action cannot be undone.</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button
                                onClick={async () => {
                                    setIsEditOpen(false);
                                    let res = await deleteStudent({ studentId: student._id });
                                    if (res.status === 200) {
                                        toast({
                                            title: "Student Deleted 🎉",
                                            variant: "success",
                                            description: student.name + " has been deleted from the database",
                                        });
                                    } else {
                                        toast({
                                            title: "Failed to delete student 😞",
                                            variant: "destructive",
                                            description: JSON.parse(JSON.stringify(res.message)),
                                        });
                                    }
                                }}
                                variant="destructive"                                    >
                                Delete
                            </Button>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};