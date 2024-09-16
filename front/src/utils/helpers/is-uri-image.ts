export const isUriImage = (uri: string): boolean => {
  // moving on, split the uri into parts that had dots before them
  const parts = uri.split('.');
  // get the last part ( should be the extension )
  const extension = parts[parts.length - 1];
  // define some image types to test against
  const imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];
  // check if the extension matches anything in the list.
  return imageTypes.indexOf(extension) !== -1;
};
