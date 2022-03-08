import {
  getDaysInMonth,
  getDay,
  sub,
  add
} from 'date-fns';
import _ from 'lodash';
import I18n from './i18n';

const monthNames = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

const dayNames = [
  'sunday', 'monday', 'tuesday', 'wednesday',
  'thursday', 'friday', 'saturday'
];

export function getCurrentMonth() {
  return new Date().getMonth();
}

export function getLocalizedMonth(month) {
  return I18n.t(monthNames[month]);
}

export function getAbbrevDays() {
  return dayNames.map(I18n.t);
}

export function dateToString(date) {
  return date.getFullYear() + "-" + zeroPad(date.getMonth() + 1) + "-" + zeroPad(date.getDate());
}

function zeroPad(str) {
  if (str.toString().length == 1) {
    return "0" + str;
  }

  return str;
}

export function getDaysArrayForMatrix() {
  const today = new Date();
  const days = getDaysInMonth(today);

  const daysArray = Array.from({ length: days }, (v, k) => k + 1);

  const daysArrayWithData = daysArray.map(day => {
    const date = new Date(today.getFullYear(), today.getMonth(), day);

    return {
      date: date,
      weekday: getDay(date),
      currentMonth: true
    };
  });

  const firstDay = daysArrayWithData[0].weekday;

  if (firstDay > 0) {
    const paddingDays = Array.from({ length: firstDay }, (v, k) => k + 1);
    const firstDayDate = daysArrayWithData[0].date;

    paddingDays.forEach(day => {
      const dayToPrepend = sub(firstDayDate, { days: day });

      daysArrayWithData.unshift({
        date: dayToPrepend,
        weekday: getDay(dayToPrepend),
        currentMonth: false
      });
    });
  }

  const lastDay = daysArrayWithData[daysArrayWithData.length - 1].weekday;

  if (lastDay < 6) {
    const paddingDays = Array.from({ length: (6 - lastDay) }, (v, k) => k + 1);
    const lastDayDate = daysArrayWithData[0].date;

    paddingDays.forEach(day => {
      const dayToAppend = add(lastDayDate, { days: day });

      daysArrayWithData.push({
        date: dayToAppend,
        weekday: getDay(dayToAppend),
        currentMonth: false
      });
    });
  }

  return daysArrayWithData;
}
