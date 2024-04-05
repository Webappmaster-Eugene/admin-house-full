export type UniversalServiceResponse<TResponseDto> = {
  data: TResponseDto | TResponseDto[] | null;
  ok: boolean;
  errCode?: string;
};
