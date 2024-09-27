import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteComment } from "@/features/comment/deleteComment/api/deleteComment.ts";

type DeleteCommentVariables = number;

export const useDeleteComment = (): UseMutationResult<
  unknown,
  AxiosError,
  DeleteCommentVariables
> => {
  return useMutation({
    mutationFn: deleteComment,
  });
};
