import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

export type DashboardMainProps = {
  currentUser: UserGetFullInfoCommand.ResponseEntity;
  stats: {
    materials: number | null;
    categories: number | null;
    fields: number | null;
  };
};
