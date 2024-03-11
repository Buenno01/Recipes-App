export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString('pt-BR');
  const formattedTime = date.toLocaleTimeString('pt-BR');
  return `${formattedDate} - ${formattedTime}`;
}
