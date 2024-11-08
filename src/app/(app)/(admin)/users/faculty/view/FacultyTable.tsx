"use client";

import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon, MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { IFacultyView } from "@/types/faculty";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFacultySchema } from "@/schemas/faculty";
import { z } from "zod";
import { deleteFaculty, updateFaculty } from "@/actions/admin/faculties";

const columns: ColumnDef<IFacultyView>[] = [
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

export const FacultyTable = ({ faculties }: { faculties: IFacultyView[] }) => {
    return (
        <>
            <DataTable columns={columns} data={faculties} />
        </>
    );
};

const Actions = ({ row }: { row: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const faculty = row.original;
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof updateFacultySchema>>({
        resolver: zodResolver(updateFacultySchema),
        defaultValues: {
            name: faculty.name,
            email: faculty.email,
        }
    });
    async function onSubmit(values: z.infer<typeof updateFacultySchema>) {
        setIsLoading(true);
        let res = await updateFaculty({
            facultyId: faculty._id,
            faculty: {
                name: values.name,
                email: values.email,
            }
        });
        setIsLoading(false);
        setIsOpen(false);
        form.resetField("name");
        form.resetField("email");
        form.reset();
        if (res.status === 200) {
            toast({
                title: "Faculty Updated 🎉",
                variant: "success",
                description: values.name + " has been updated in the database",
            });
        } else {
            toast({
                title: "Failed to update faculty 😞",
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
                                                    defaultValue={faculty.name}
                                                    value={form.watch("name") || faculty.name}
                                                    onChange={(e: any) => {
                                                        form.setValue("name", e.target.value);
                                                        form.setValue("email", e.target.value.length > 0 ? e.target.value.toLowerCase().replace(/\s/g, "") + "@faculty.cs.com" : "");
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
                                            title="Email is auto generated based on the name"
                                        >
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Faculty Email"
                                                    type="email"
                                                    disabled={true}
                                                    defaultValue={form.watch("email") || faculty.email}
                                                    value={form.watch("email") || faculty.email}
                                                    onChange={field.onChange}
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
                            <AlertDialogTitle>Delete Faculty</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete <b>{faculty.name}</b> with email <b>{faculty.email}</b>?
                                <br />
                                <span className="text-red-600">Note: This action cannot be undone.</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button
                                onClick={async () => {
                                    setIsEditOpen(false);
                                    let res = await deleteFaculty({
                                        facultyId: faculty._id
                                    });
                                    if (res.status === 200) {
                                        toast({
                                            title: "Faculty Deleted 🎉",
                                            variant: "success",
                                            description: faculty.name + " has been deleted from the database",
                                        });
                                    } else {
                                        toast({
                                            title: "Failed to delete faculty 😞",
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