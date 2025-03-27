import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserFormData } from "@/lib/schema";

interface FormShellProps {
  title: string;
  description: string;
  children?: ReactNode;
  footer?: ReactNode;
  formSuccess?: UserFormData | null;
  accentColor?: string;
}

export function FormShell({
  title,
  description,
  children,
  footer,
  formSuccess = null,
  accentColor = "bg-blue-500",
}: FormShellProps) {
  if (formSuccess) {
    return (
      <Card className="w-full">
        <div className={`h-2 ${accentColor}`} />
        <CardHeader>
          <CardTitle>Form successfully submitted!</CardTitle>
          <CardDescription>Here's the data that was sent:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
            <pre className="text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {JSON.stringify(formSuccess, null, 2)}
            </pre>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md text-sm font-medium"
          >
            Reset
          </button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div className={`h-2 ${accentColor}`} />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
