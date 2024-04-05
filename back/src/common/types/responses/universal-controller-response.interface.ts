export type UniversalControllerResponse<TResponseDto> = {
  data: TResponseDto | TResponseDto[] | null;
  error: string | null | unknown;
};
