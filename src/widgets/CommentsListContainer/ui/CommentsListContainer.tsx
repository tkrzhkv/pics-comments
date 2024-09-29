import {
  deleteLocalComment,
  setAllComments,
} from "@/features/comment/createComment/model/commentSlice.ts";
import { selectLocalComments } from "@/features/comment/createComment/model/selectors.ts";
import { setSkip } from "@/features/comment/persistedScroll/model/scrollSlice.ts";
import { useConfirmation } from "@/shared/hooks/useConfirmation.ts";
import { ConfirmationModal } from "@/shared/ui/confirm-modal";
import { useInfiniteCommentsRetrieve } from "@/widgets/CommentsListContainer/api/useCommentsRetrieve.ts";
import { Heading, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentsVirtualizedList } from "@/widgets/CommentsVirtualizedList";

export const CommentsListContainer = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const localComments = useSelector(selectLocalComments);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteCommentsRetrieve();

  useEffect(() => {
    if (data) {
      const allComments = data.pages.flatMap((page) => page.comments);

      dispatch(setAllComments([...allComments, ...localComments]));

      if (data.pageParams.length > 1) {
        dispatch(setSkip(data.pageParams[data.pageParams.length - 1]));
      }
    }
  }, [data]);

  const allRows = useMemo(() => {
    return [...localComments].reverse();
  }, [data, localComments]);

  const deleteConfirmation = useConfirmation(async (id) => {
    dispatch(deleteLocalComment(id));
    toast({ status: "success", title: "Comment successfully removed" });
  });

  return (
    <VStack w="full" justifyContent="center">
      <Heading color="blue.300" py={8}>
        Check, write, remove your comments...
      </Heading>

      {allRows && (
        <CommentsVirtualizedList
          data-testid="comments-virtualized-list"
          comments={allRows}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          deleteConfirmation={deleteConfirmation}
          isFetching={isFetching}
          isLoading={isFetching}
        />
      )}

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={deleteConfirmation.handleCancel}
        onConfirm={deleteConfirmation.handleConfirm}
        title="Please confirm your action"
        message="Are you sure that you want delete comment ?"
        confirmButtonText="Yes, delete"
        cancelButtonText="No, cancel"
      />
    </VStack>
  );
};
