import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

type BackendResponse<TData> = {
  statusCode: number;
  message: string;
  errors?: Array<{ name: string; description: string }> | null;
  data: TData;
};

/**
 * Generic wrapper for server actions that make HTTP requests via axiosInstance.
 * Handles error normalization, HTTP status codes, and cache revalidation.
 *
 * @param call - async function that performs the HTTP request
 * @param revalidatePaths - Next.js paths to revalidate after a successful mutation
 */
export async function callAction<TResponseEntity>(
  call: () => Promise<BackendResponse<TResponseEntity>>,
  revalidatePaths: string[] = []
): Promise<TResponseEntity | ErrorFromBackend> {
  const errorObject: ErrorFromBackend = { error: null };

  try {
    const response = await call();

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePaths.forEach((path) => revalidatePath(path));
      return response.data as TResponseEntity;
    }

    if (response?.errors?.[0]) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message ?? null;
    return errorObject;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
