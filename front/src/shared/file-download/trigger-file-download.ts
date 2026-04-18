interface TriggerFileDownloadParams {
  base64: string;
  fileName: string;
  mimeType: string;
}

/**
 * Универсальный helper для инициирования скачивания файла из base64.
 * Работает на клиенте: декодирует base64 → Blob → создаёт `<a download>` → кликает → очищает URL.
 *
 * Используется в разных виджетах (сметы/единички/пироги) — единая точка декодирования
 * минимизирует риск утечек ObjectURL.
 */
export function triggerFileDownload({ base64, fileName, mimeType }: TriggerFileDownloadParams): void {
  const byteArray = Uint8Array.from(atob(base64), (ch) => ch.charCodeAt(0));
  const blob = new Blob([byteArray], { type: mimeType });
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export const XLSX_MIME_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
