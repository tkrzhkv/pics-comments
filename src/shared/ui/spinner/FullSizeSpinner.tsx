import { Box, Spinner } from "@chakra-ui/react";

export const FullSizeSpinner = () => {
  return (
    <Box position="absolute" right="50%" top="50%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};
