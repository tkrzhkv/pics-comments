import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postComment } from "@/features/comment/createComment/api/postComment.ts";
import { AxiosError } from "axios";

type PostCommentData = {
  body: string;
  postId: number;
  userId: number;
};
export const usePostComment = (): UseMutationResult<
  unknown,
  AxiosError,
  PostCommentData
> => {
  return useMutation({
    mutationFn: postComment,
  });
};
