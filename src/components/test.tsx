import { useFormContext } from "react-hook-form";

export const Test = () => {
  console.log("test");

  const { watch } = useFormContext();
  const username = watch("username");

  if (username === "elie") {
    return <p>Test Elie</p>;
  }

  return <p>Test </p>;
};
