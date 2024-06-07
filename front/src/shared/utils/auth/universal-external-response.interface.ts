export interface UniversalExternalResponse<TResponseDto> {
  data: TResponseDto | null;
  statusCode: number;
  message: string;
  errors?: Array<unknown>;
}
