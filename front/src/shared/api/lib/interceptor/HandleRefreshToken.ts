import axios from "axios";

import { REFRESH_URL } from "../../const/RefreshUrl";

export const handleRefreshToken = async (
  oldRefreshToken: string | null
): Promise<[string, string]> => {
  if (!oldRefreshToken) {
    throw new Error("refreshToken does not exist");
  }

  try {
    const {
      data: { accessToken, refreshToken },
    }: { data: { accessToken: string; refreshToken: string } } = await axios.post(REFRESH_URL, {
      refreshToken: oldRefreshToken,
    });

    return [accessToken, refreshToken];
  } catch (error) {
    throw new Error(
      `Произошла ошибка при обновлении accessToken и refreshToken - ${error}, токены не обновлены`
    );
  }
};
