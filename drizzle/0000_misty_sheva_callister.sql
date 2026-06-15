CREATE TABLE "comments" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"comment_text" text NOT NULL,
	"user_id" integer NOT NULL,
	"goal_id" integer NOT NULL,
	"parent_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"goal_id" serial PRIMARY KEY NOT NULL,
	"goal_title" varchar(128) NOT NULL,
	"goal_content" text,
	"status" varchar(16) DEFAULT 'private',
	"user_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"like_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"goal_id" integer,
	"comment_id" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_goal_like_unique" UNIQUE("user_id","goal_id"),
	CONSTRAINT "user_comment_like_unique" UNIQUE("user_id","comment_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" varchar(64) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_goal_id_goals_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("goal_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_comments_comment_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comments"("comment_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_goal_id_goals_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("goal_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_comment_id_comments_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("comment_id") ON DELETE no action ON UPDATE no action;