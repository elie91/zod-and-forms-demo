"use client";

import { useState } from "react";
import { toast } from "sonner";

import { FormShell, BasicSubmitButton } from "@/components/forms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultValues, UserFormData } from "@/lib/schema";

export default function BasicFormPage() {
  const [formData, setFormData] = useState<UserFormData>(defaultValues);

  // handling manually the errors, loading and success states
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

  // Basic validation function without Zod
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "username":
        if (!value) return "Username is required";
        if (value.length < 3)
          return "Username must contain at least 3 characters";
        if (value.length > 50) return "Username cannot exceed 50 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return "Username can only contain letters, numbers and underscores";
        return "";

      case "email":
        if (!value) return "Email is required";
        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email address";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8)
          return "Password must contain at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";
        if (!/[^a-zA-Z0-9]/.test(value))
          return "Password must contain at least one special character";
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords don't match";
        return "";

      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        const dob = new Date(value);
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        if (dob > eighteenYearsAgo) return "You must be at least 18 years old";
        return "";

      default:
        return "";
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

  // Validate all form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Simulate API call with delay
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
        title="Basic Form"
        description="Form created with just useState and manual validation (without Zod)"
        formSuccess={formData}
        accentColor="bg-blue-500"
      />
    );
  }

  return (
    <FormShell
      title="Basic Form"
      description="Form created with just useState and manual validation (without Zod)"
      accentColor="bg-blue-500"
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

        <BasicSubmitButton isSubmitting={isSubmitting} />
      </form>
    </FormShell>
  );
}
