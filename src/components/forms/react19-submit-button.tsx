import { FC } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

export const React19SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
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
