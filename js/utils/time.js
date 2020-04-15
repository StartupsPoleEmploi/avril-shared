import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';
import addDays from 'date-fns/addDays';
import parseISO from 'date-fns/parseISO';
import formatISO from 'date-fns/formatISO';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

export const dateFormat = 'dd/MM/yyyy';
export const hourFormat = 'HH\'h\'mm';
export const dateTimeFormat = `${dateFormat} ${hourFormat}`;

export const workedDays = period => {
  return differenceInBusinessDays((period.end ? addDays(period.end, 1) : new Date()), period.start)
}

export const periodTotalHours = period => {
  const dailyHours = parseInt(period.weekHours)/5;
  return parseInt(dailyHours * workedDays(period))
}

export const isMoreThanOneWeek = period => {
  return workedDays(period) > 5;
}

export const formatDate = date => {
  if (date) {
    return format(date, dateFormat);
  }
}

export const formatInterval = (fromDate, toDate) => {
  if (isSameDay(fromDate, toDate)) {
    const fromDateString = `${format(fromDate, dateFormat)} de ${format(fromDate, hourFormat)}`;
    return `le ${fromDateString} à ${format(toDate, hourFormat)}`
  }
  return `du ${format(fromDate, dateTimeFormat)} au ${format(toDate, dateTimeFormat)}`
}

export const formatISODate = (date, representation='date') => {
  if (date) {
    return formatISO(date, {representation});
  }
}

export const parseISODate = date => {
  if (date) {
    return parseISO(date);
  }
}

export const parseAndFormat = date => {
  if (date) {
    return formatDate(parseISODate(date));
  }
}