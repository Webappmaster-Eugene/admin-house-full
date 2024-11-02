import { templaterCreatorRegex } from '@/utils/regex/temlater-creator.regex';

export const templaterCreatorTexts = (
  fullString: string,
  infoToReplace?: Array<string | undefined> | string
) => {
  if (infoToReplace) {
    if (Array.isArray(infoToReplace)) {
      infoToReplace.forEach((info) => {
        if (info) {
          fullString = fullString.replace(templaterCreatorRegex, info);
        }
      });
    } else {
      fullString = fullString.replace(templaterCreatorRegex, infoToReplace);
    }
    return fullString;
  }
  return fullString;
};
