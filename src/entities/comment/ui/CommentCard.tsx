import { HStack, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Comment } from "@/shared/types/comments/getCommentsTypes.ts";
import { VirtualItem } from "@tanstack/react-virtual";
import { DeleteButton } from "@/shared/ui/buttons/DeleteButton.tsx";

type CommentCardProps = {
  comment: Comment;
  virtualRow: VirtualItem;
};
export const CommentCard: FC<CommentCardProps> = ({ comment, virtualRow }) => {
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
        <Text fontWeight="bold">{comment.user.fullName}</Text>
        <Text>{comment.body}</Text>
        <Text color="gray.500">Likes: {comment.likes}</Text>
      </VStack>
      <DeleteButton
        onClick={() => {
          console.log(comment.id);
        }}
      />
    </HStack>
  );
};
