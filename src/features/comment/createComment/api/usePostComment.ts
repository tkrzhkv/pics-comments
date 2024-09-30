import { postComment } from "@/features/comment/createComment/api/postComment.ts";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";

import type { CommentResponseType } from "@/shared/types/comments/getCommentsTypes.ts";
import type { AxiosError } from "axios";

export type PostCommentData = {
	body: string;
	postId: number;
	userId: number;
};
export const usePostComment = (): UseMutationResult<
	CommentResponseType,
	AxiosError,
	PostCommentData
> => {
	return useMutation({
		mutationFn: postComment,
	});
};
