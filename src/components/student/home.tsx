import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function NewStudentAlert({ studentName }: { studentName: string }) {
    return (
        <Alert variant={"destructive"} className="my-2 animate-pulse">
            <AlertTitle className="text-lg">
                Heads up & Welcome {studentName}!
            </AlertTitle>
            <AlertDescription>
                Looks like your account is new. Please change your password as soon as possible.
            </AlertDescription>
        </Alert>
    );
}
