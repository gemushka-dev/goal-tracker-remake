import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  unique,
  foreignKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const goals = pgTable("goals", {
  goalId: serial("goal_id").primaryKey(),
  goalTitle: varchar("goal_title", { length: 128 }).notNull(),
  goalContent: text("goal_content"),
  status: varchar("status", { length: 16 }).default("private"),
  userId: integer("user_id").references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
});

export const comments = pgTable(
  "comments",
  {
    commentId: serial("comment_id").primaryKey(),
    commentText: text("comment_text").notNull(),
    userId: integer("user_id")
      .references(() => users.userId, { onDelete: "cascade" })
      .notNull(),
    goalId: integer("goal_id")
      .references(() => goals.goalId, { onDelete: "cascade" })
      .notNull(),
    parentId: integer("parent_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.commentId],
      }).onDelete("cascade"),
    };
  },
);

export const likes = pgTable(
  "likes",
  {
    likeId: serial("like_id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.userId)
      .notNull(),
    goalId: integer("goal_id").references(() => goals.goalId, {
      onDelete: "cascade",
    }),
    commentId: integer("comment_id").references(() => comments.commentId, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("user_goal_like_unique").on(table.userId, table.goalId),
    unique("user_comment_like_unique").on(table.userId, table.commentId),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  likes: many(likes),
  comments: many(comments),
}));

export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, { fields: [goals.userId], references: [users.userId] }),
  likes: many(likes),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, { fields: [comments.userId], references: [users.userId] }),
  goal: one(goals, { fields: [comments.goalId], references: [goals.goalId] }),
  likes: many(likes),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.commentId],
    relationName: "comment_replies",
  }),
  replies: many(comments, { relationName: "comment_replies" }),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, { fields: [likes.userId], references: [users.userId] }),
  goal: one(goals, { fields: [likes.goalId], references: [goals.goalId] }),
  comment: one(comments, {
    fields: [likes.commentId],
    references: [comments.commentId],
  }),
}));
