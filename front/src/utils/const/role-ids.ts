export const ROLE_IDS = {
  ADMIN: 1,
  MANAGER: 2,
  WORKER: 3,
  CUSTOMER: 4,
} as const;

export const ROLE_NAME_BY_ID: Record<number, string> = {
  [ROLE_IDS.ADMIN]: 'Администратор',
  [ROLE_IDS.MANAGER]: 'Менеджер',
  [ROLE_IDS.WORKER]: 'Сотрудник',
  [ROLE_IDS.CUSTOMER]: 'Заказчик',
};

export const ROLE_ID_BY_NAME: Record<string, number> = {
  ADMIN: ROLE_IDS.ADMIN,
  MANAGER: ROLE_IDS.MANAGER,
  WORKER: ROLE_IDS.WORKER,
  CUSTOMER: ROLE_IDS.CUSTOMER,
};
