import { forwardRef, useRef } from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { removeScrollBarStyles } from "@/shared/utils/removeScrollBarStyles.ts";
import { InfinityQueryResultType } from "@/shared/types/comments/getCommentsTypes.ts";
import { CommentCard } from "@/entities/comment/ui";
import { FullSizeSpinner } from "@/shared/ui/spinner";

type CommentsVirtualizedListProps = {
  comments: InfinityQueryResultType | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};

export const CommentsVirtualizedList = forwardRef<
  HTMLDivElement,
  CommentsVirtualizedListProps
>(({ comments, isFetchingNextPage, hasNextPage, isLoading }, ref) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const allComments = comments?.pages.flatMap((page) => page.comments) || [];

  const rowVirtualizer = useVirtualizer({
    count: allComments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    gap: 10,
  });

  return (
    <Box
      ref={parentRef}
      width="60vw"
      height="50vh"
      overflowY="auto"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      css={removeScrollBarStyles}
      p={4}
    >
      {!isLoading ? (
        <Box
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const comment = allComments[virtualRow.index];

            return (
              <CommentCard
                key={virtualRow.key}
                comment={comment}
                virtualRow={virtualRow}
              />
            );
          })}
        </Box>
      ) : (
        <Center h="full">
          <FullSizeSpinner />
        </Center>
      )}

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
