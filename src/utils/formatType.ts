export const formatType = (type: string) => {
  if (type === 'drink' || type === 'meal') return `${type}s`;
  return type;
};
