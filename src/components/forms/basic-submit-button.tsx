import { FC } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "../ui/button";

interface Props {
  isSubmitting: boolean;
}

export const BasicSubmitButton: FC<Props> = ({
  isSubmitting: externalIsSubmitting,
}) => {
  console.log("SubmitButton");
  const formContext = useFormContext();

  const isSubmitting = formContext
    ? formContext.formState.isSubmitting
    : externalIsSubmitting;

  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          <span>Creating user...</span>
        </div>
      ) : (
        "Create User"
      )}
    </Button>
  );
};
