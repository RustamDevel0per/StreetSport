import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({name:createCategoryDto.name , description:createCategoryDto.description || "" , parent_id:createCategoryDto.parent_id!});
  }

  findAll() {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException();
    }

    await category.update(updateCategoryDto);
    await category.save();
    return category;
  }

  async remove(id: number) {
    const category = await this.categoryModel.destroy({ where: { id } });

    if (!category) {
      throw new NotFoundException();
    }
    return { message: "Category deleted" };
  }
}
