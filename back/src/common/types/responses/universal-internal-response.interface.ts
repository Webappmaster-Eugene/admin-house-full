import { InternalError } from '../../../common/errors/errors-description.backend';

export interface UniversalInternalResponse<TResponseDto> {
  ok: boolean;
  data: TResponseDto | InternalError;
}

// const isNotOk = (data: unknown | InternalError): data is InternalError => {
//   return data instanceof InternalError;
// };

const isOk = <TResponseDto>(data: TResponseDto | InternalError): data is TResponseDto => {
  return !(data instanceof InternalError);
};

export class InternalResponse<TResponseDto> implements UniversalInternalResponse<TResponseDto> {
  public ok: boolean;

  constructor(public data: TResponseDto | InternalError) {
    this.ok = !!isOk<TResponseDto>(this.data);
    if (isOk<TResponseDto>(this.data)) {
      const dat = this.data as TResponseDto;
    }

    return this;
  }
}
