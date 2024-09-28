import axios from "axios";
import { PostCommentData } from "@/features/comment/createComment/api/usePostComment.ts";

export const postComment = async (data: PostCommentData) => {
  const response = await axios.post(
    "https://dummyjson.com/comments/add",
    data,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};
