import {
  AppInfoUpdateRequestDto,
  AppInfoUpdateResponseDto,
} from '../dto/controller/update-app-info.dto';
import { AppInfoGetResponseDto } from '../dto/controller/get-app-info.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

export interface IAppInfoController {
  getEP: (urlParams: IUrlParams) => Promise<AppInfoGetResponseDto>;
  updateEP: (
    dto: AppInfoUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<AppInfoUpdateResponseDto>;
}
