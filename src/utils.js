import dayjs from 'dayjs';

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  month = Math.floor(month);

  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonth = 0 - firstDayOfMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonth++;
      return dayjs(new Date(year, month, currentMonth));
    });
  });

  return daysMatrix;
};
