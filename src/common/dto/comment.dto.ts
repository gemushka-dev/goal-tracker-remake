export type CommentGoalDTO = {
  commentText: string;
  userId: number;
  goalId: number;
};
export type CommentCommentDTO = {
  commentText: string;
  userId: number;
  goalId: number;
  parentId: number;
};
