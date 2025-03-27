"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { FormShell, SubmitButton } from "@/components/forms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultValues, UserFormData, userSchema } from "@/lib/schema";

const baseSchema = userSchema._def.schema;

export default function ZodFormPage() {
  const [formData, setFormData] = useState<UserFormData>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate a single field using Zod
  const validateField = (name: string, value: any): string => {
    try {
      // For confirmPassword, we need to handle it specially due to the refinement
      if (name === "confirmPassword") {
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords don't match";
        return "";
      }

      // For other fields, use their individual schemas
      const fieldSchema =
        baseSchema.shape[name as keyof typeof baseSchema.shape];
      fieldSchema.parse(value);
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || "Invalid value";
      }
      return "Invalid value";
    }
  };

  // Validate on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  // Validate the entire form using Zod
  const validateForm = () => {
    try {
      // Validate the entire form data with the schema
      userSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to our format
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const createUser = async (data: UserFormData): Promise<void> => {
    console.log("Creating user...", data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createUser(formData);

      toast(`User ${formData.username} created successfully.`);

      setFormData(defaultValues);
      setSuccess(true);
    } catch (error: any) {
      toast(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <FormShell
        title="Zod Form"
        description="Form using Zod for validation but still with manual state management"
        formSuccess={formData}
        accentColor="bg-green-500"
      />
    );
  }

  return (
    <FormShell
      title="Zod Form"
      description="Form using Zod for validation but still with manual state management"
      accentColor="bg-green-500"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username ? "border-destructive" : ""}
            placeholder="johndoe"
            required
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username}</p>
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
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? "border-destructive" : ""}
            placeholder="john.doe@example.com"
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
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
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password ? "border-destructive" : ""}
            required
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
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
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.confirmPassword ? "border-destructive" : ""}
            required
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
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
            name="dateOfBirth"
            type="date"
            value={
              typeof formData.dateOfBirth === "string"
                ? formData.dateOfBirth
                : formData.dateOfBirth.toISOString().split("T")[0]
            }
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.dateOfBirth ? "border-destructive" : ""}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
          )}
        </div>

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </FormShell>
  );
}
