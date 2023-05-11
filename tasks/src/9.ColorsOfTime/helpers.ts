export function toUtc(date: Date | null) {
  if (!date) {
    return date;
  }
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export function toTimezone(date: Date | null, offset: number) {
  if (!date) {
    return date;
  }
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * offset);
}
