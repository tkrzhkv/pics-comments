import { CommentsListContainer } from "@/widgets/CommentsListContainer";
import { CommentFormContainer } from "@/widgets/CommentFormContainer";
import { VStack } from "@chakra-ui/react";

export const HomePage = () => {
  return (
    <VStack>
      <CommentsListContainer />
      <CommentFormContainer />
    </VStack>
  );
};
