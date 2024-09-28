import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import {
  CommentResponseType,
  InfinityQueryResultType,
} from "@/shared/types/comments/getCommentsTypes.ts";
import { getComments } from "@/widgets/CommentsListContainer/api/getComment.ts";

export const useInfiniteCommentsRetrieve = (): UseInfiniteQueryResult<
  InfinityQueryResultType,
  CommentResponseType
> => {
  return useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: getComments,
    getNextPageParam: (lastPage) => {
      const { skip, total, limit } = lastPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? nextSkip : undefined;
    },
    initialPageParam: 0,
    placeholderData: {
      pages: [
        {
          comments: [],
          total: 0,
          skip: 0,
          limit: 200,
        },
      ],
      pageParams: [],
    },
  });
};
