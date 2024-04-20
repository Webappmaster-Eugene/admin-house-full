import { AbstractClassType } from '../../types/abstract.class';

export function toResponseClientArray<ResponseDto>(
  arrayFromService: Array<unknown>,
  classResponse: AbstractClassType,
): ResponseDto[] {
  return arrayFromService.map((elem) => {
    return new classResponse(elem);
  });
}
