import fastingData from './data';
import { dateToString } from './util/date';
import './DayCell.css';

function DayCell(props) {
  const { day } = props;

  let classes = 'calendar-body-day';

  if (!day.currentMonth) {
    classes += ' calendar-body-day-previous-month';
  }

  const data = fastingData[dateToString(day.date)];

  if (data && data.fast === 'strict') {
    classes += ' calendar-body-day-strict-fast';
  }
  
  return (
    <div className={classes}>
      {day.date.getDate()}
    </div>
  );
}

export default DayCell;
