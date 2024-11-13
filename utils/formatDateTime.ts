import dayjs from 'dayjs';

const formatDate = (date: string) => {
  return dayjs(date).format('dddd, DD MMMM YYYY');
};

const formatHour = (date: string) => {
    const hour = dayjs(date).format('h:mm A');
    return hour;
}

export { formatDate, formatHour };
