import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postComment } from "@/features/comment/createComment/api/postComment.ts";

import { AxiosError } from "axios";
import { CommentResponseType } from "@/shared/types/comments/getCommentsTypes.ts";

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
