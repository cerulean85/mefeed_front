export function isImageUrl(url: string) {
  const tokenCount = url.split(".").length;
  const extension = url.split(".")[tokenCount - 1];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg", "webp"];
  return imageExtensions.includes(extension);
}

export function isYoutubeUrl(url: string) {
  return /youtube\.com/.test(url);
}