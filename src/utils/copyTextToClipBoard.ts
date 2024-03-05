export const copyTextToClipBoard = async (text: string, response?: string) => {
  await navigator.clipboard.writeText(text);
  const res = response || 'Link copied!';
  return res;
};
