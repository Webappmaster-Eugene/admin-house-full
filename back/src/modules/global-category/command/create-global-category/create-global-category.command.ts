import { GlobalCategoryCreateRequestDto } from '../../dto/controller/create-global-category.dto';

export class CreateGlobalCategoryCommand {
  constructor(public readonly dto: GlobalCategoryCreateRequestDto) {}
}
