import {Body, Controller, Get, HttpCode, Param, UsePipes, ValidationPipe,Post} from '@nestjs/common';
import { CommentService } from './comment.service';
import {Types} from 'mongoose';
import {IdValidationPipe} from '../pipes/id.validation.pipe';
import {CommentDto} from './dto/comment.dto';
import {User} from '../user/decorators/user.decorator';
import {ApiTags} from '@nestjs/swagger';



@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Get('by-movie/:movieId')
  async getCommentByVideoId(
     @Param('movieId', IdValidationPipe) movieId: Types.ObjectId
  ) {
    return this.commentService.byMovieId(movieId)
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createComment(
     @User('_id') _id: Types.ObjectId,
     @Body() dto: CommentDto
  ) {
    return this.commentService.create(_id, dto)
  }
}
