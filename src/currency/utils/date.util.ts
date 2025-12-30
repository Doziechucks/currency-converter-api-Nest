export function formatTimestamp(date: Date = new Date()): string {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const day = days[date.getDay()];

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const dateNum = date.getDate().toString().padStart(2, '0');

  // Get dynamic timezone abbreviation
  const timezone = getTimezoneAbbreviation(date);

  return `${day} ${hours}:${minutes}:${seconds} ${timezone}, ${year}-${month}-${dateNum}`;
}

function getTimezoneAbbreviation(date: Date): string {
  // Get the timezone string (e.g., "West Africa Standard Time" or "GMT+1")
  const timeZoneString = date.toLocaleTimeString('en-US', {
    timeZoneName: 'short',
  });

  // Extract timezone abbreviation (e.g., "WAT", "GMT+1", "EST")
  const match = timeZoneString.match(/\b([A-Z]{3,5}|GMT[+-]\d{1,2})\b/);

  if (match) {
    return match[0];
  }

  // Fallback: get offset in hours
  const offset = -date.getTimezoneOffset() / 60;
  const sign = offset >= 0 ? '+' : '-';
  return `GMT${sign}${Math.abs(offset)}`;
}
