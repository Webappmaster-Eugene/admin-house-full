import { NotFoundException } from '@nestjs/common';
import { EntityName } from '../types/entity.enum';
import { toEntityArray } from '../utils/mappers';
import { TemplateEntityClass } from '../types/template.entity-class';
import { isArrayEntityHandler } from '../type-guards/is-array-entity.handler';

export function existenceEntityHandler<TEntity>(
  entityFromDb: unknown,
  EntityClass: TemplateEntityClass<TEntity>,
  entityName: EntityName,
  errorException?: { message: string; description: string },
): TEntity | TEntity[] {
  if (entityFromDb) {
    if (isArrayEntityHandler<TEntity>(entityFromDb)) {
      return toEntityArray(entityFromDb, EntityClass);
    } else {
      return new EntityClass(entityFromDb);
    }
  } else {
    const error = errorException
      ? errorException
      : {
          message: `${entityName} with this uuid not found`,
          description: `${entityName} from your request did not found in the database. Please, check check that the entered uuid is correct!`,
        };
    throw new NotFoundException(error);
  }
}
