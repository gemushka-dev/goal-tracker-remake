import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, GoalsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
