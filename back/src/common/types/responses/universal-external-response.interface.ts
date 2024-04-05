export interface UniversalExternalResponse<TResponseDto = null> {
  data: TResponseDto | null;
  error?: string | null | unknown;
}

export class ExternalResponse<TResponseDto = null>
  implements UniversalExternalResponse<TResponseDto>
{
  constructor(
    public data: TResponseDto | null = null,
    public error: string | null | unknown = null,
  ) {}
}
