import React, { forwardRef, useEffect, useRef } from "react";
import { Box, Center, Text, useToast } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { removeScrollBarStyles } from "@/shared/utils/removeScrollBarStyles.ts";
import { InfinityQueryResultType } from "@/shared/types/comments/getCommentsTypes.ts";
import { CommentCard } from "@/entities/comment/ui";
import { useConfirmation } from "@/shared/hooks/useConfirmation.ts";
import { ConfirmationModal } from "@/shared/ui/confirm-modal";
import { FullSizeSpinner } from "@/shared/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/appStore.ts";
import { setScrollPosition } from "@/features/comment/persistedScroll/model/scrollSlice.ts";
import { deleteLocalComment } from "@/features/comment/createComment/model/commentSlice.ts";
import { useQueryClient } from "@tanstack/react-query";
import { selectLocalComments } from "@/features/comment/createComment/model/selectors.ts";

type CommentsVirtualizedListProps = {
  comments: InfinityQueryResultType | undefined;
  hasNextPage: boolean;
  isLoading: boolean;
};

export const CommentsVirtualizedList = forwardRef<
  HTMLDivElement,
  CommentsVirtualizedListProps
>(({ comments, hasNextPage, isLoading }, ref) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const localComments = useSelector(selectLocalComments);
  const scrollPosition = useSelector(
    (state: RootState) => state.scroll.scrollPosition,
  );

  const allComments = [
    ...(comments?.pages?.flatMap((page) => page.comments) || []),
    ...localComments,
  ].reverse();

  const rowVirtualizer = useVirtualizer({
    count: allComments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    gap: 10,
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    dispatch(setScrollPosition(scrollTop));
  };

  const deleteConfirmation = useConfirmation(async (id) => {
    dispatch(deleteLocalComment(id));
    await queryClient.invalidateQueries({ queryKey: ["comments"] });
    toast({ status: "success", title: "Comment successfully removed" });
  });

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = scrollPosition ?? 0;
    }
  }, [scrollPosition, comments]);

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
      onScroll={handleScroll}
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
        message="Are you sure that you want to remove this comment?"
        confirmButtonText="Yes, remove"
        cancelButtonText="No, cancel"
      />
    </Box>
  );
});
