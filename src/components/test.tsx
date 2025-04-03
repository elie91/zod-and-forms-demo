import { useFormContext, useWatch } from "react-hook-form";

export const Test = () => {
  console.log("test");

  const { control } = useFormContext();
  const username = useWatch({ control, name: "username" });

  if (username === "elie") {
    return <p>Test Elie</p>;
  }

  return <p>Test </p>;
};
