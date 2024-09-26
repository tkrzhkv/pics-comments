import { useInfiniteCommentsRetrieve } from "@/widgets/CommentsListContainer/api/useCommentsRetrieve.ts";
import { useCallback, useEffect } from "react";

import { useInView } from "react-intersection-observer";
import { Heading, useToast, VStack } from "@chakra-ui/react";
import { CommentsVirtualizedList } from "@/widgets/CommentsVirtualizedList";
import { FullSizeSpinner } from "@/shared/ui/spinner";

export function CommentsListContainer() {
  const toast = useToast();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteCommentsRetrieve();

  const { ref, inView } = useInView();

  const fetchNext = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage().catch((error) => {
        toast({ status: "error", title: error });
      });
    }
  }, [hasNextPage, fetchNextPage, toast]);

  useEffect(() => {
    if (inView) {
      fetchNext();
    }
  }, [inView, fetchNext]);

  return (
    <VStack w="full" justifyContent="center">
      <Heading color="blue.300" py={8}>
        Check, write, update, remove your comments...
      </Heading>

      {!isLoading ? (
        <CommentsVirtualizedList
          hasNextPage={hasNextPage}
          ref={ref}
          isFetchingNextPage={isFetchingNextPage}
          comments={data}
        />
      ) : (
        <FullSizeSpinner />
      )}
    </VStack>
  );
}
