import { useState } from 'react';
import {
  getCurrentMonth,
  getLocalizedMonth,
  getAbbrevDays,
  getDaysArrayForMatrix
} from './util/date';
import fastingData from './data';

import DayCell from './DayCell';
import './App.css';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const daysArray = getDaysArrayForMatrix();

  return (
    <div className="content-wrapper">
      <div className="calendar-wrapper">
        <div className="month-name-wrapper">
          <h1 className="month-name">{getLocalizedMonth(currentMonth)}</h1>
        </div>
        <div className="calendar-body-wrapper">
          {getAbbrevDays().map(name => (
            <div key={name} className="calendar-header-day">{name}</div>
          ))}
          {daysArray.map(day => <DayCell day={day} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
