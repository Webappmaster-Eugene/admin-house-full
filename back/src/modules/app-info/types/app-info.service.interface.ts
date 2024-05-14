import { AppInfoUpdateRequestDto } from '../dto/controller/update-app-info.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { AppInfoEntity } from '../entities/app-info.entity';

export interface IAppInfoService {
  get: () => Promise<UniversalInternalResponse<AppInfoEntity>>;
  update: (dto: AppInfoUpdateRequestDto) => Promise<UniversalInternalResponse<AppInfoEntity>>;
}
