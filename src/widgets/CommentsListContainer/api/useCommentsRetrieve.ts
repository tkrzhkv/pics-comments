import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import {
  CommentsResponse,
  InfinityQueryResultType,
} from "@/shared/types/comments/getCommentsTypes.ts";

const getComments = async ({ pageParam = 0 }): Promise<CommentsResponse> => {
  const limit = 30;
  const response = await axios.get(
    `https://dummyjson.com/comments?skip=${pageParam}&limit=${limit}`,
  );
  return response.data;
};

export const useInfiniteCommentsRetrieve = (): UseInfiniteQueryResult<
  InfinityQueryResultType,
  unknown
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
  });
};
