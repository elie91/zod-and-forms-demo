"use client";

import { useActionState } from "react";

import { createUserAction } from "@/actions/create-user-action";
import { FormShell } from "@/components/forms";
import { React19SubmitButton } from "@/components/forms/react19-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { defaultValues } from "@/lib/schema";

export default function React19FormPage() {
  const [state, formAction, isPending] = useActionState(createUserAction, {
    success: false,
    data: null,
    errors: {},
  });

  console.log(state, isPending);

  const errors = state.errors as Record<string, string>;

  return (
    <FormShell
      title="React 19 Form + Zod"
      description="Form using React 19 hooks with Zod validation"
      accentColor="bg-amber-500"
    >
      {state.success && (
        <div className="mb-4">
          <p className="text-sm text-green-500">Form submitted successfully!</p>
        </div>
      )}
      <form action={formAction} className="space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className={errors?.username ? "text-destructive" : ""}
          >
            Username <span className="text-destructive">*</span>
          </Label>
          <Input
            id="username"
            name="username"
            //defaultValue={defaultValues.username}
            className={errors?.username ? "border-destructive" : ""}
            placeholder="johndoe"
            required
          />
          {errors?.username && (
            <p className="text-sm text-destructive">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={errors?.email ? "text-destructive" : ""}
          >
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            //defaultValue={defaultValues.email}
            className={errors?.email ? "border-destructive" : ""}
            placeholder="john.doe@example.com"
            required
          />
          {errors?.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className={errors?.password ? "text-destructive" : ""}
          >
            Password <span className="text-destructive">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            //defaultValue={defaultValues.password}
            className={errors?.password ? "border-destructive" : ""}
            required
          />
          {errors?.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className={errors?.confirmPassword ? "text-destructive" : ""}
          >
            Confirm Password <span className="text-destructive">*</span>
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            //defaultValue={defaultValues.confirmPassword}
            className={errors?.confirmPassword ? "border-destructive" : ""}
            required
          />
          {errors?.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Date of Birth Field */}
        <div className="space-y-2">
          <Label
            htmlFor="dateOfBirth"
            className={errors?.dateOfBirth ? "text-destructive" : ""}
          >
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            /*             defaultValue={
              typeof defaultValues.dateOfBirth === "string"
                ? defaultValues.dateOfBirth
                : defaultValues.dateOfBirth.toISOString().split("T")[0]
            } */
            className={errors?.dateOfBirth ? "border-destructive" : ""}
            required
          />
          {errors?.dateOfBirth && (
            <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
          )}
        </div>

        <React19SubmitButton />
      </form>
    </FormShell>
  );
}
