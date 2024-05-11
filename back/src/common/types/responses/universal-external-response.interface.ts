export interface UniversalExternalResponse<TResponseDto> {
  data: TResponseDto | null;
  statusCode: number;
  message: string;
  errors?: Array<unknown>;
}

export class ExternalResponse<TResponseDto> implements UniversalExternalResponse<TResponseDto> {
  constructor(
    public data: TResponseDto | null = null,
    public statusCode: number = 200,
    public message: string = 'Success',
    public errors?: Array<unknown>,
  ) {}
}
