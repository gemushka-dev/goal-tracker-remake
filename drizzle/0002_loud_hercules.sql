ALTER TABLE "goals" DROP CONSTRAINT "goals_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "chk_one_like" CHECK ((
          "likes"."goal_id" IS NOT NULL
          AND "likes"."comment_id" IS NULL
        )
        OR
        (
          "likes"."goal_id" IS NULL
          AND "likes"."comment_id" IS NOT NULL
        ));