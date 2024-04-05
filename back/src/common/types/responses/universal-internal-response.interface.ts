export interface UniversalInternalResponse<TResponseDto = null> {
  data: TResponseDto | null;
  ok: boolean;
  errCode?: string | null;
}

export class InternalResponse<TResponseDto = null>
  implements UniversalInternalResponse<TResponseDto>
{
  constructor(
    public data: TResponseDto | null = null,
    public ok: boolean = true,
    public errCode?: string,
  ) {}
}
