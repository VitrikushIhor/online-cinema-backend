import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  UsePipes,
  ValidationPipe,
  Post,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {Types} from 'mongoose';
import {IdValidationPipe} from '../pipes/id.validation.pipe';
import {CommentDto} from './dto/comment.dto';
import {User} from '../user/decorators/user.decorator';
import {ApiTags} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';



@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Get('by-movie/:movieId')
  async getCommentByVideoId(
     @Param('movieId', IdValidationPipe) movieId: string
  ) {
    return this.commentService.byMovieId(movieId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createComment(
     @User('_id') _id: string,
     @Body() dto: CommentDto
  ) {
    return this.commentService.create(_id, dto)
  }
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.commentService.delete(id)
    if (!deletedDoc) throw new NotFoundException('Comment not found')
  }

}
