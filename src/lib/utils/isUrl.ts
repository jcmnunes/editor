export const isUrl = (text: string) => {
  let url;

  try {
    url = new URL(text);
  } catch (err) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
