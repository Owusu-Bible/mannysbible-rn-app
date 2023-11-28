import React, {useMemo, useState} from 'react';
import {CalendarList, DateData} from 'israel_calendar';

import {Container, Text} from 'lib_components';
import styles from './styles';
import {getHolyDaysOfTheYear, IHolyDay} from '@utils/.';
import {format} from 'date-fns';

const RANGE = 50;
const initialDate = new Date();

function renderCustomHeader(date) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#5E60CE',
    paddingRight: 5,
  };

  return (
    <Container style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </Container>
  );
}

export const Calendar: React.FC = ({}) => {
  const [selected, setSelected] = useState(initialDate);
  const [currentYear, setCurrentYear] = useState(initialDate);

  const markedDates = useMemo(() => {
    const holyDays = getHolyDaysOfTheYear(currentYear);
    const daysToMark: {[key: string]: any} = {};
    // [Object.values(holyDays)[1],Object.values(holyDays)[2]].forEach((holyDay: IHolyDay) => {
    Object.values(holyDays).forEach((holyDay: IHolyDay) => {
      holyDay?.dates?.forEach(date => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        daysToMark[`${formattedDate}`] = {color: holyDay.color};
        if (date.getTime() === holyDay?.startingDate?.getTime()) {
          daysToMark[`${formattedDate}`].startingDay = true;
        }
        if (date.getTime() === holyDay?.endingDate?.getTime()) {
          daysToMark[`${formattedDate}`].endingDay = true;
        }
      });
    });

    daysToMark[`${format(initialDate, 'yyyy-MM-dd')}`] = {
      ...daysToMark[`${format(initialDate, 'yyyy-MM-dd')}`],
      selected: true,
      customContainerStyle: {
        backgroundColor: '#4386F3',
      },
      // textColor: "red",
    };
    return daysToMark;
  }, [currentYear]);

  const onDayPress = day => {
    setSelected(day.dateString);
  };
console.log(`${initialDate}`)
  return (
    <Container>
      <CalendarList
        current={`${initialDate}`}
        hideExtraDays={true}
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        renderHeader={renderCustomHeader}
        onDayPress={onDayPress}
        markingType={'period'}
        markedDates={markedDates}
        // isLunar={true}
        onVisibleMonthsChange={(months: DateData[]) => {
          const d = new Date(months?.[0].dateString);
          if (d.getFullYear() !== currentYear.getFullYear()) {
            setCurrentYear(d);
          }
        }}
      />
    </Container>
  );
};
export default Calendar;
