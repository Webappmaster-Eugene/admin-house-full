import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllGlobalCategoryMaterialsQuery } from './get-all-global-category-materials.query';
import { Inject } from '@nestjs/common';
import { KFI } from '../../../../common/utils/di';
import { IGlobalCategoryMaterialRepository } from '../../types/global-category-material.repository.interface';

@QueryHandler(GetAllGlobalCategoryMaterialsQuery)
export class GetAllGlobalCategoryMaterialsHandler implements IQueryHandler<GetAllGlobalCategoryMaterialsQuery> {
  constructor(
    @Inject(KFI.GLOBAL_CATEGORY_MATERIAL_REPOSITORY)
    private readonly globalCategoryMaterialRepository: IGlobalCategoryMaterialRepository,
  ) {}
  execute({}: GetAllGlobalCategoryMaterialsQuery) {
    return this.globalCategoryMaterialRepository.getAll();
  }
}
