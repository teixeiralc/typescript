export default function stringToDate(dateInText: string): Date {
  const [date, time] = dateInText.split(' ');
  const [day, month, year] = date.split('/').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute);
}
