import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {ConfigModule} from '@nestjs/config';
import {TypegooseModule} from 'nestjs-typegoose';
import {CommentModel} from './comment.model';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'Comment'
        }
      }
    ]),
    ConfigModule
  ]
})
export class CommentModule {}