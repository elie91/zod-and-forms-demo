"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormShell, RHFSubmitButton } from "@/components/forms";
import { Test } from "@/components/test";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultValues, UserFormData, userSchema } from "@/lib/schema";

export default function ReactHookFormPage() {
  const methods = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    //watch,
  } = methods;

  const createUser = async (data: UserFormData): Promise<void> => {
    console.log("Creating user...", data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser(data);

      toast(`User ${data.username} created successfully.`);

      reset(defaultValues);
    } catch (error: any) {
      toast(`Error: ${error.message}`);
    }
  };

  return (
    <FormShell
      title="React Hook Form + Zod"
      description="Form using React Hook Form with Zod validation"
      accentColor="bg-purple-500"
    >
      {isSubmitSuccessful && (
        <div className="mb-4">
          <p className="text-sm text-green-500">Form submitted successfully!</p>
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className={errors.username ? "text-destructive" : ""}
            >
              Username <span className="text-destructive">*</span>
            </Label>
            <Input
              id="username"
              {...register("username")}
              className={errors.username ? "border-destructive" : ""}
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className={errors.email ? "text-destructive" : ""}
            >
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className={errors.password ? "text-destructive" : ""}
            >
              Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className={errors.confirmPassword ? "text-destructive" : ""}
            >
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "border-destructive" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="space-y-2">
            <Label
              htmlFor="dateOfBirth"
              className={errors.dateOfBirth ? "text-destructive" : ""}
            >
              Date of Birth <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              className={errors.dateOfBirth ? "border-destructive" : ""}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-destructive">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <Test />
          <RHFSubmitButton />
        </form>
      </FormProvider>
    </FormShell>
  );
}
