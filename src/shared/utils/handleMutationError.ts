import { CreateToastFnReturn } from "@chakra-ui/react"; // Ensure you have this import for toast
import axios from "axios";

export const handleMutationError = (
  error: Error,
  toast: CreateToastFnReturn,
) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message || "An unknown error occurred";
    toast({
      status: "error",
      title: message,
    });
  } else {
    toast({
      status: "error",
      title: "An unknown error occurred",
    });
  }
};
