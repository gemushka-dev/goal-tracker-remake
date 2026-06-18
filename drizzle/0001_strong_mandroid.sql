ALTER TABLE "likes" DROP CONSTRAINT "likes_comment_id_comments_comment_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_comment_id_comments_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("comment_id") ON DELETE cascade ON UPDATE no action;