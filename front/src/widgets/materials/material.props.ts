import {
  MaterialGetAllCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@numart/house-admin-contracts';

export type MaterialsProps = {
  materialsInfo: MaterialGetAllCommand.ResponseEntity;
  responsibleProducers: ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
};
