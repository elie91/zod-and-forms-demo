import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const formDemos = [
    {
      id: "basic",
      title: "Basic",
      description:
        "Form implementation with standard HTML elements and useState.",
      href: "/forms/basic",
      color: "bg-blue-500",
    },
    {
      id: "zod",
      title: "Zod",
      description: "Form with Zod validation and manual status management.",
      href: "/forms/zod",
      color: "bg-green-500",
    },
    {
      id: "react-hook-form",
      title: "React Hook Form + Zod",
      description: "Using React Hook Form with Zod validation and resolver.",
      href: "/forms/react-hook-form",
      color: "bg-purple-500",
    },
    {
      id: "react19",
      title: "Hooks React 19",
      description: "Form using React 19's new hooks",
      href: "/forms/react19",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Forms Demo</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Comparaison of different approaches to implement forms in React
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formDemos.map((demo) => (
            <Card key={demo.id} className="overflow-hidden">
              <div className={`h-2 ${demo.color}`} />
              <CardHeader>
                <CardTitle>{demo.title}</CardTitle>
                <CardDescription>{demo.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <Link href={demo.href} className="w-full">
                  <Button className="w-full">View Demo</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
