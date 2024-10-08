import { HStack, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { CommentResponseType } from "@/shared/types/comments/getCommentsTypes.ts";
import { VirtualItem } from "@tanstack/react-virtual";
import { DeleteButton } from "@/shared/ui/buttons/delete";
import { FaRegHeart } from "react-icons/fa";

type CommentCardProps = {
  comment: CommentResponseType;
  virtualRow: VirtualItem;
  removeComment: (id: number) => void;
};
export const CommentCard: FC<CommentCardProps> = ({
  comment,
  virtualRow,
  removeComment,
}) => {
  const { id, user, body, likes } = comment ?? {};

  return (
    <HStack
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start}px)`,
      }}
      p={2}
      borderWidth="1px"
      borderRadius="md"
    >
      <VStack align="start" spacing={1} width="100%">
        <Text fontWeight="bold">{user?.fullName ?? ""}</Text>
        <Text>{body}</Text>
        <HStack>
          <FaRegHeart />
          <Text color="gray.500">{`${likes ?? 2}`}</Text>
        </HStack>
      </VStack>
      <DeleteButton
        onClick={() => {
          removeComment(id ?? 0);
        }}
      />
    </HStack>
  );
};
