import { CommentsResponse } from "@/shared/types/comments/getCommentsTypes.ts";
import axios from "axios";

export const getComments = async ({
  pageParam = 0,
}): Promise<CommentsResponse> => {
  const limit = 200;
  const response = await axios.get(
    `https://dummyjson.com/comments?skip=${pageParam}&limit=${limit}`,
  );
  return response.data;
};
