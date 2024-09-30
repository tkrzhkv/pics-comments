import type {
	CommentResponseType,
	InfinityQueryResultType,
} from "@/shared/types/comments/getCommentsTypes.ts";
import { getComments } from "@/widgets/CommentsListContainer/api/getComment.ts";
import {
	type UseInfiniteQueryResult,
	useInfiniteQuery,
} from "@tanstack/react-query";

export const useInfiniteCommentsRetrieve = (): UseInfiniteQueryResult<
	InfinityQueryResultType,
	CommentResponseType
> => {
	// const skip = useSelector(selectScrollPosition);

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
			pages: [],
			pageParams: [],
		},
	});
};
