import { AxiosRequestConfig } from "axios";

export async function debounceRequests<T extends AxiosRequestConfig<unknown>>(
  config: T,
  checker: () => boolean,
  getterAccess: () => string | null,
  timeout: number,
  maxTimeout: number
): Promise<T> {
  // возвращаем Promise - без асинхронщины здесь не обойтись
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const isRefreshing = checker();
      // зацикливание, пока isRefreshing не будет равно false (то есть другой запрос, отправленный ранее
      // уже получил актуальные токены и мы можем выйти из цикла, чтобы отправить запрос с уже актуальными токенами)
      if (!isRefreshing) {
        const newConfig: T = config;
        const newAccessToken = getterAccess();
        if (newConfig.headers) {
          newConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        resolve(newConfig);
        clearInterval(interval);
      }
      // если isRefreshing === true, то мы в эту функцию просто не попадем сверху
    }, timeout);

    // в случае проблемы с сетью, сервером или другими ошибками - если запрос не проходит, отдаем ошибку
    setTimeout(() => {
      clearInterval(interval);
      reject(new Error("Error: MAX_TIMEOUT - превышено время ожидания обновления refreshToken"));
    }, maxTimeout);
  });
}
