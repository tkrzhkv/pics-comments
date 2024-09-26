import axios from "axios";

export const postComment = async (data: {
  body: string;
  postId: number;
  userId: number;
}) => {
  const response = await axios.post(
    "https://dummyjson.com/comments/add",
    data,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};
