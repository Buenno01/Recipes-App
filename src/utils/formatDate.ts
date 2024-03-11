export function formatDate(originalDate: string) {
  // date = Year-Month-Day Hour-Minute-Second
  const [dateAndHour] = originalDate.split(' ');
  const [year, month, day] = dateAndHour.split('-');
  let substringDay = day;
  if (/T/.test(day)) substringDay = day.substring(0, 2);

  return `${substringDay}/${month}/${year}`;
}
