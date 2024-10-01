import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      bgColor="white"
      border="1px solid #f3f3f3"
      _hover={{ backgroundColor: "gray.50" }}
      _active={{ backgroundColor: "gray.300" }}
    >
      <AiOutlineDelete />
    </Button>
  );
};
