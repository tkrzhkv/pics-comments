import { forwardRef, useRef } from "react";
import { Box, Spinner, Text, useToast, Center } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { removeScrollBarStyles } from "@/shared/utils/removeScrollBarStyles.ts";
import { InfinityQueryResultType } from "@/shared/types/comments/getCommentsTypes.ts";
import { CommentCard } from "@/entities/comment/ui";
import { useDeleteComment } from "@/features/comment/deleteComment/api/useDeleteComment.ts";
import { handleMutationError } from "@/shared/utils/handleMutationError.ts";
import { useConfirmation } from "@/shared/hooks/useConfirmation.ts";
import { ConfirmationModal } from "@/shared/ui/confirm-modal";
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
  const toast = useToast();

  const allComments = comments?.pages.flatMap((page) => page.comments) || [];

  const { mutate: removeComment } = useDeleteComment();

  const deleteConfirmation = useConfirmation((id) => {
    removeComment(id, {
      onSuccess: () =>
        toast({ status: "success", title: "Comment successfully removed" }),
      onError: (error: Error) => handleMutationError(error, toast),
    });
  });

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
                    removeComment={deleteConfirmation.handleOpen}
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
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={deleteConfirmation.handleCancel}
        onConfirm={deleteConfirmation.handleConfirm}
        title="Please confirm your action"
        message="Are you sure that you want remove this comment ?"
        confirmButtonText="Yes, remove"
        cancelButtonText="No, cancel"
      />
    </Box>
  );
});
