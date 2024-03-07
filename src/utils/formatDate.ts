export function formatDate(originalDate: string) {
  // date = Year-Month-Day Hour-Minute-Second
  const [dateAndHour] = originalDate.split(' ');
  const [year, month, day] = dateAndHour.split('-');
  return `${day}/${month}/${year}`;
}
