import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormShellProps {
  title: string;
  description: string;
  children?: ReactNode;
  footer?: ReactNode;
  accentColor?: string;
}

export function FormShell({
  title,
  description,
  children,
  footer,
  accentColor = "bg-blue-500",
}: FormShellProps) {
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
