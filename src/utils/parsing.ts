function dateParser(date: string): string {
  const dateObject: Date = new Date(Date.parse(date));

  let dateString = `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  if (isToday(dateObject)) {
    dateString = `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  } else {
    dateString = `${dateObject.getMonth() + 1}/${dateObject.getDate().toString().padStart(2, '0')}`;
  }
  return dateString;
}
function isToday(date: Date) {
  const today = new Date();

  if (today.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
}

export { dateParser };
