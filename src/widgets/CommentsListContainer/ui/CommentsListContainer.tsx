import { useInfiniteCommentsRetrieve } from "@/widgets/CommentsListContainer/api/useCommentsRetrieve.ts";
import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Heading, useToast, VStack } from "@chakra-ui/react";
import { CommentsVirtualizedList } from "@/widgets/CommentsVirtualizedList";
import { setAllComments } from "@/features/comment/createComment/model/commentSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { selectLocalComments } from "@/features/comment/createComment/model/selectors.ts";

export function CommentsListContainer() {
  const toast = useToast();
  const dispatch = useDispatch();
  const localComments = useSelector(selectLocalComments);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteCommentsRetrieve();

  const { ref, inView } = useInView();

  const fetchNext = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage().catch((error) => {
        toast({ status: "error", title: error.message });
      });
    }
  }, [hasNextPage, fetchNextPage, toast]);

  useEffect(() => {
    if (inView) {
      fetchNext();
    }
  }, [inView, fetchNext]);

  useEffect(() => {
    if (data && localComments.length === 0) {
      const allComments = data.pages.flatMap((page) => page.comments);
      dispatch(setAllComments(allComments));
    }
  }, [data, localComments.length, dispatch]);

  return (
    <VStack w="full" justifyContent="center">
      <Heading color="blue.300" py={8}>
        Check, write, remove your comments...
      </Heading>

      <CommentsVirtualizedList
        data-testid="comments-virtualized-list"
        hasNextPage={hasNextPage}
        ref={ref}
        comments={data}
        isLoading={isFetching || isLoading}
      />
    </VStack>
  );
}
