"use client";

import { useActionState } from "react";

import { createUserAction } from "@/actions/create-user-action";
import { FormShell } from "@/components/forms";
import { React19SubmitButton } from "@/components/forms/react19-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultValues } from "@/lib/schema";

export default function React19FormPage() {
  const [state, formAction, isPending] = useActionState(createUserAction, {
    success: false,
    data: null,
    errors: {},
  });

  if (state.success) {
    return (
      <FormShell
        title="React 19 Form + Zod"
        description="Form using React 19 hooks with Zod validation"
        formSuccess={state.data}
        accentColor="bg-amber-500"
      />
    );
  }

  return (
    <FormShell
      title="React 19 Form + Zod"
      description="Form using React 19 hooks with Zod validation"
      accentColor="bg-amber-500"
    >
      <form action={formAction} className="space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className={state.errors?.username ? "text-destructive" : ""}
          >
            Username <span className="text-destructive">*</span>
          </Label>
          <Input
            id="username"
            name="username"
            defaultValue={defaultValues.username}
            className={state.errors?.username ? "border-destructive" : ""}
            placeholder="johndoe"
            required
          />
          {state.errors?.username && (
            <p className="text-sm text-destructive">{state.errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={state.errors?.email ? "text-destructive" : ""}
          >
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={defaultValues.email}
            className={state.errors?.email ? "border-destructive" : ""}
            placeholder="john.doe@example.com"
            required
          />
          {state.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className={state.errors?.password ? "text-destructive" : ""}
          >
            Password <span className="text-destructive">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={defaultValues.password}
            className={state.errors?.password ? "border-destructive" : ""}
            required
          />
          {state.errors?.password && (
            <p className="text-sm text-destructive">{state.errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className={state.errors?.confirmPassword ? "text-destructive" : ""}
          >
            Confirm Password <span className="text-destructive">*</span>
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            defaultValue={defaultValues.confirmPassword}
            className={
              state.errors?.confirmPassword ? "border-destructive" : ""
            }
            required
          />
          {state.errors?.confirmPassword && (
            <p className="text-sm text-destructive">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Date of Birth Field */}
        <div className="space-y-2">
          <Label
            htmlFor="dateOfBirth"
            className={state.errors?.dateOfBirth ? "text-destructive" : ""}
          >
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            defaultValue={
              typeof defaultValues.dateOfBirth === "string"
                ? defaultValues.dateOfBirth
                : ""
            }
            className={state.errors?.dateOfBirth ? "border-destructive" : ""}
            required
          />
          {state.errors?.dateOfBirth && (
            <p className="text-sm text-destructive">
              {state.errors.dateOfBirth}
            </p>
          )}
        </div>

        <React19SubmitButton />
      </form>
    </FormShell>
  );
}
