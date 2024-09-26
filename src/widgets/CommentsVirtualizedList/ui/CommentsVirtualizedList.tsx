import { forwardRef } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { removeScrollBarStyles } from "@/shared/utils/removeScrollBarStyles.ts";
import { InfinityQueryResultType } from "@/shared/types/comments/getCommentsTypes.ts";

type CommentsVirtualizedListProps = {
  comments: InfinityQueryResultType | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const CommentsVirtualizedList = forwardRef<
  HTMLDivElement,
  CommentsVirtualizedListProps
>(({ comments, isFetchingNextPage, hasNextPage }, ref) => {
  return (
    <Box
      width="60vw"
      height="80vh"
      overflowY="scroll"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      css={removeScrollBarStyles}
      p={4}
    >
      {comments?.pages?.map((page, i) => (
        <Box key={i} mb={4}>
          {page.comments.map((comment) => (
            <Box
              key={comment.id}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              mb={2}
            >
              <Text fontWeight="bold">{comment.user.fullName}</Text>
              <Text>{comment.body}</Text>
              <Text color="gray.500">Likes: {comment.likes}</Text>
            </Box>
          ))}
        </Box>
      ))}
      {hasNextPage && <Box ref={ref} height="20px" />}
      {isFetchingNextPage && (
        <Box textAlign="center" mt={4}>
          <Spinner size="sm" />
        </Box>
      )}
      {!hasNextPage && (
        <Text textAlign="center" mt={4}>
          No more comments to load
        </Text>
      )}
    </Box>
  );
});
