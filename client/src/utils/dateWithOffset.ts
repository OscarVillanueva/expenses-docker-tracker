export const dateWithOffset = (date: string) => {
  const localDate = new Date(date);

  const offsetInMinutes = localDate.getTimezoneOffset();
  const sign = offsetInMinutes > 0 ? '-' : '+';

  const offsetHours = Math.abs(Math.floor(offsetInMinutes / 60));
  const offsetMinutesPart = Math.abs(offsetInMinutes % 60);

  const formattedOffset = `${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutesPart).padStart(2, '0')}`;

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  const seconds = String(localDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${formattedOffset}`;
}
