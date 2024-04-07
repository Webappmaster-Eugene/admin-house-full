export interface UniversalExternalResponse<TResponseDto = null> {
  data: TResponseDto | null;
  statusCode: number;
  message: string;
  errors?: Array<unknown> | null;
  error?: string;
}

export class ExternalResponse<TResponseDto = null>
  implements UniversalExternalResponse<TResponseDto>
{
  constructor(
    public data: TResponseDto | null = null,
    public statusCode: number = 200,
    public message: string = 'Success',
    public errors?: Array<unknown> | null,
    public error?: string,
  ) {}
}
