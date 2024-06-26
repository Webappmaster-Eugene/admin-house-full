export const enum SIDE_EFFECTS {
  AUTH_COOKIE = 'Adding two auth cookies (jwt-tokens) to the response',
  GENERATE_STRICT_ADMIN_KEY = 'Generate strict admin key and add it to the db table "RegisterWithRoleKey"',
  CREATE_MANAGER = 'При создании пользователя с ролью "manager" с помощью транзакции в БД создается автоматически workspace и handbook для его рабочего пространства',
}
