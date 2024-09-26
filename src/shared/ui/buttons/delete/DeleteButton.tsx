import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      bgColor="red.100"
      _hover={{ backgroundColor: "red.200" }}
      _active={{ backgroundColor: "red.500" }}
    >
      <AiOutlineDelete />
    </Button>
  );
};
