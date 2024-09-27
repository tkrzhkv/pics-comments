import axios from "axios";

export const deleteComment = async (commentId: number): Promise<unknown> => {
  const response = await axios.delete(
    `https://dummyjson.com/comments/${commentId}`,
  );
  return response.data;
};
