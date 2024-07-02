export const frontendFromBackendErrors: { [key: string]: string } = {
  'Prisma conflict error':
    'Пользователь с такими данными уже существует. Введите другой email для регистрации',
  'Failed to get requesting info - you have not got required access rights':
    'У вас нет достаточных прав для совершения этого действия. Свяжитесь с администратором для получения дополнительной информации',
};
