'use server';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function exportEstimate(
  workspaceId: string,
  projectId: string,
  estimateId: string
): Promise<{ base64: string; fileName: string } | { error: string }> {
  try {
    const url = axiosEndpoints.estimate.export
      .replace(':workspaceId', workspaceId)
      .replace(':projectId', projectId)
      .replace(':estimateId', estimateId);

    const response = await axiosInstance.get(url, {
      responseType: 'arraybuffer',
    });

    const disposition = (response.headers['content-disposition'] as string) ?? '';
    const match = disposition.match(/filename="(.+?)"/);
    const fileName = match?.[1] ?? `estimate-${estimateId}.xlsx`;

    const base64 = Buffer.from(response.data as ArrayBuffer).toString('base64');
    return { base64, fileName };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
