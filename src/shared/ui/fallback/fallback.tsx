import { Link, useRouteError } from "react-router-dom";
import { RejectedDataType } from "@/shared/types";
import { Alert, Heading } from "@chakra-ui/react";

export const Fallback = () => {
  const error = useRouteError();
  const knownError = error as RejectedDataType;

  return (
    <Alert>
      <Heading>Something went wrong</Heading>
      <Text>
        {knownError?.messageError} {knownError?.status}
      </Text>
      <Link to="/">Go to home page</Link>
    </Alert>
  );
};
