import { InternalError } from '../../errors/errors.backend';

export interface UniversalInternalResponse<TResponseDto = null> {
  data: TResponseDto | null;
  ok: boolean;
  error?: InternalError | undefined;
}

export class InternalResponse<TResponseDto = null>
  implements UniversalInternalResponse<TResponseDto>
{
  constructor(
    public data: TResponseDto | null = null,
    public ok: boolean = true,
    public error?: InternalError | undefined,
  ) {}
}
