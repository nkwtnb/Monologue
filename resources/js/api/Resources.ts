type ImageType = "profile" | "upfiles" | "ogp";
export const makePathForImage = (fileName: string | undefined | null, type: ImageType): string => {
  if (fileName) {
    return `${location.protocol}//${location.host}/images/${type}/${fileName}`;  
  } else {
    return "";
  }
}
