export type CommentResponseType = {
  id?: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

export type CommentsResponse = {
  comments: CommentResponseType[];
  total: number;
  skip: number;
  limit: number;
};

export type InfinityQueryResultType = {
  pageParam: number[];
  pages: CommentsResponse[];
};
