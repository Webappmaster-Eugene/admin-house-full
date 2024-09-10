// import { AutomapperProfile, InjectMapper } from '@numart/automapper/nestjs';
//
// import { Injectable } from '@nestjs/common';
// import { createMap, Mapper, MappingProfile } from '@numart/automapper/core';
// import { StatusApproveGetResponseDto } from '../../modules/status-approve/dto/controller/get-status-approve.dto';
//
// @Injectable()
// export class StatusApproveProfile extends AutomapperProfile {
//   constructor(@InjectMapper() mapper: Mapper) {
//     super(mapper);
//   }
//
//   override get profile() {
//     return (mapper: Mapper) => {
//       createMap<ApproveStatus, StatusApproveGetResponseDto>(mapper, 'Test', 'TestDto');
//     };
//   }
// }
