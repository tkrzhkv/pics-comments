import { FC, PropsWithChildren, Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export const SuspenseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" height="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      }
    >
      {children}
    </Suspense>
  );
};
