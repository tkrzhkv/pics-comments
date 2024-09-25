import { FC } from "react";
import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/config/routes";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Center mt="50px">
      <Center>
        <VStack>
          <Text
            fontSize="30px"
            fontWeight={700}
            color="blue.300"
            textAlign="center"
          >
            Oops ! Page not found !
          </Text>
          <Button onClick={() => navigate(RouteNames.HOME)}>
            Back to home page
          </Button>
        </VStack>
      </Center>
    </Center>
  );
};
