import type { Mapper, MappingConfiguration, MappingProfile } from 'automapper/core';
export declare abstract class AutomapperProfile {
  protected mapper: Mapper;
  protected constructor(mapper: Mapper);
  abstract get profile(): MappingProfile;
  protected get mappingConfigurations(): MappingConfiguration[];
}