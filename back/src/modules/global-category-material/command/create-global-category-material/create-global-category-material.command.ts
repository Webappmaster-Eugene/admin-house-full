import { GlobalCategoryMaterialCreateRequestDto } from '../../dto/controller/create-global-category-material.dto';

export class CreateGlobalCategoryMaterialCommand {
  constructor(public readonly dto: GlobalCategoryMaterialCreateRequestDto) {}
}
