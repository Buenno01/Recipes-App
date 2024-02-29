export const copyTextToClipBoard = async (text: string, response?: string) => {
  await navigator.clipboard.writeText(text);
  const textElement = document.createElement('span');
  if (!response) textElement.textContent = 'Link copied!';
  return textElement;
};
