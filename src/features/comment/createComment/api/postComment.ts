import type { PostCommentData } from "@/features/comment/createComment/api/usePostComment.ts";
import axios from "axios";

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
