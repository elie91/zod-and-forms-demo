"use server";

import { z } from "zod";

import { userSchema } from "@/lib/schema";

export async function createUserAction(prevState: any, formData: FormData) {
  console.log("Creating user...", formData);
  const rawFormData = Object.fromEntries(formData.entries());

  const formValues = {
    ...rawFormData,
    dateOfBirth: rawFormData.dateOfBirth
      ? new Date(rawFormData.dateOfBirth as string)
      : undefined,
  };

  try {
    userSchema.parse(data);
  } catch (error: any) {
    console.log(error);
  }
  try {
    const validatedData = userSchema.parse(formValues);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      data: validatedData,
      errors: {},
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        formattedErrors[path] = err.message;
      });

      return {
        success: false,
        data: null,
        errors: formattedErrors,
      };
    }

    return {
      success: false,
      data: null,
      errors: { _form: "Une erreur est survenue" },
    };
  }
}
