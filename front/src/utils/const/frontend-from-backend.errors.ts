export const frontendFromBackendErrors: { [key: string]: string } = {
  'Prisma conflict error':
    'Пользователь с такими данными уже существует. Введите другой email для регистрации',
  'Failed to get requesting info - you have not got required access rights':
    'У вас нет достаточных прав для совершения этого действия. Свяжитесь с администратором для получения дополнительной информации',
  'Unauthorized error':
    'Неверный email или пароль. Проверьте данные и попробуйте снова',
  'Not found':
    'Запрашиваемые данные не найдены',
  'Error error':
    'У вас нет достаточных прав для совершения этого действия',
  'Error error (access jwt expired)':
    'Сессия истекла. Пожалуйста, войдите заново',
  'Error with refresh token (refresh jwt expired)':
    'Сессия истекла. Пожалуйста, войдите заново',
  'Сlient error':
    'Ошибка в запросе. Проверьте введённые данные',
  'Internal error':
    'Произошла внутренняя ошибка сервера. Попробуйте позже',
  'Workspace mismatch error':
    'Ошибка доступа к рабочему пространству. Проверьте ваши права доступа',
};
