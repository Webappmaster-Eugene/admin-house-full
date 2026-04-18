'use server';

import axios from 'axios';

import { axiosEndpoints } from 'src/entities/auth/lib';
import { getAccessToken, getRefreshToken } from 'src/entities/auth/lib/auth.service';

/**
 * Экспорт всех единичек справочника в Excel.
 *
 * Не используем общий axiosInstance: его response-interceptor разворачивает ответ до res.data,
 * после чего содержимое буфера и HTTP-headers становятся недоступны.
 */
export async function exportAllUnitTemplates(
  workspaceId: string,
  handbookId: string,
): Promise<{ base64: string; fileName: string } | { error: string }> {
  try {
    const url = axiosEndpoints.unit_template.export_all
      .replace(':workspaceId', workspaceId)
      .replace(':handbookId', handbookId);

    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    if (!accessToken) {
      return { error: 'Не удалось получить access-token' };
    }

    const response = await axios.get<ArrayBuffer>(url, {
      baseURL: process.env.NEXT_PUBLIC_HOST_API,
      withCredentials: true,
      responseType: 'arraybuffer',
      headers: {
        Authorization: accessToken,
        ...(refreshToken ? { Cookie: `REFRESH_KEY=${refreshToken}` } : {}),
      },
    });

    const disposition = (response.headers['content-disposition'] as string) ?? '';
    const match = disposition.match(/filename="([^"]+)"/);
    const fileName = match?.[1] ?? `unit-templates-${handbookId}.xlsx`;

    const base64 = Buffer.from(response.data).toString('base64');
    return { base64, fileName };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
