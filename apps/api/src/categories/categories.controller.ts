import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CategoryCreateDto, CategoryUpdateDto } from '@wallock/schemas';
import { AuthRequest } from 'src/common/auth-request';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(
    @Req() req: AuthRequest,
    @Body() dto: CategoryCreateDto,
  ) {
    return await this.categoriesService.createCategory(req.user, dto);
  }

  @Patch()
  async updateCategory(
    @Req() req: AuthRequest,
    @Body() dto: CategoryUpdateDto
  ) {
    return await this.categoriesService.updateCategory(req.user, dto);
  }

  @Get()
  async findCategories(@Req() req: AuthRequest) {
    return await this.categoriesService.findCategories(req.user);
  }

  @Get(':id')
  async findCategoryWithId(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.categoriesService.findCategoryById(req.user, id);
  }
}
