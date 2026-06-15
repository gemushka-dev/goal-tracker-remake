export type GoalDTO = {
  goalTitle: string;
  goalContent: string;
  status?: "private" | "public";
  userId: number;
};
