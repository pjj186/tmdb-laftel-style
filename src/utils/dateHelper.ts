export const getStartAndEndOfWeek = () => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  let date = new Date();
  date.setHours(date.getHours() + 9);
  const today = date.getDay();
  const diff = date.getDate() - today + (today === 1 ? 0 : 1);

  const startOfWeek = new Date(date);
  startOfWeek.setDate(diff + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const result: {
    [key: string]: string;
  } = {};

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    result[days[i]] = currentDate.toISOString().split('T')[0];
  }

  return result;
};

export const getFormattedToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
