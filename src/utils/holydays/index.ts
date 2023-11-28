import {lunar} from 'israel_calendar';
import * as Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);
import {HOLYDAYS, IHolyDay} from './types';

export const createHolyDaysTemplate = (): {[key: string]: IHolyDay} => ({
  weeklySabbath: {
    name: 'Weekly Sabbath',
    month: 1,
    day: 1,
    duration: 1,
    dates: [],
    observation: [],
    scriptures: [],
    isWeeklySabbath: true,
    color: '#00CC33',
  },
  newMoon: {
    name: 'New Moon',
    month: 1,
    day: 1,
    duration: 1,
    dates: [],
    observation: [],
    scriptures: [],
    isNewMoons: true,
    color: '#CF0FCC',
  },
  passover: {
    name: 'Passover',
    month: 1,
    day: 15,
    duration: 8, // first day, passover, then 7 days unleavened bread
    dates: [],
    observation: [],
    scriptures: [],
    color: '#FF0033',
  },
  dayOfSimon: {
    name: 'Day Of Simon',
    month: 2,
    day: 23,
    duration: 1,
    dates: [],
    observation: [],
    scriptures: [],
    color: '#660033',
  },
  feastOfFirstFruits: {
    name: 'Feast Of First Fruits',
    month: 1,
    day: 1,
    duration: 1,
    dates: [],
    isPentacost: true,
    observation: [],
    scriptures: [],
    color: '#33FF66',
  },
  memorialBlowingOfTrumpets: {
    name: 'Memorial Blowing Of Trumpets',
    month: 7,
    day: 1,
    duration: 1,
    dates: [],
    observation: [],
    scriptures: [],
    color: '#29B6F6',
  },
  dayOfAtonement: {
    name: 'Day Of Atonement',
    month: 7,
    day: 10,
    duration: 1,
    dates: [],
    observation: [
      {
        isNonRegSabbath: true,
        description: [],
      },
    ],
    scriptures: [],
    color: '#7E57C2',
  },
  feastOfTabernacles: {
    name: 'Feast Of Tabernacles',
    month: 7,
    day: 15,
    duration: 7,
    dates: [],
    observation: [],
    scriptures: [],
    color: '#FFD54F',
  },
  feastOfDedication: {
    name: 'Feast Of Dedication',
    month: 9,
    day: 25,
    duration: 7,
    dates: [],
    observation: [],
    scriptures: [],
    color: '#FF8A65',
  },
  destructionOfNicanor: {
    name: 'Destruction Of Nicanor',
    month: 12,
    day: 13,
    duration: 1,
    dates: [],
    observation: [],
    scriptures: [],
    color: '#0033FF',
  },
  purim: {
    name: 'Purim',
    month: 12,
    day: 14,
    duration: 1,
    dates: [],
    observation: [],
    scriptures: [],
    color: '#FF33CC',
  },
});

const getDaysArray = (start: Date, end: Date): Date[] => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

function getSabbathOfCurrentWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -1 : 6);
  return date.setDate(diff), date;
}
function getNextSabbathOfDate(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + 6;
  return date.setDate(diff), date;
}
export const getHolyDaysOfTheYear = (date: Date, spreadByDate?: boolean) => {
  const holyDays = createHolyDaysTemplate();
  const firstDayOfTheYear = lunar.getLunarFirstDay(date);

  const nextYear = new Date(firstDayOfTheYear);
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  const sabbathSpread: IHolyDay[] = [];
  const newMoonSpread: IHolyDay[] = [];

  Object.values(holyDays).forEach(holyDay => {
    if (holyDay.isWeeklySabbath) {
      let firstSabbath = getNextSabbathOfDate(firstDayOfTheYear);
      while (firstSabbath < nextYear) {
        const theDate = new Date(firstSabbath);
        holyDay?.dates.push(theDate);
        const spreadedHolyDay = {
          ...holyDay,
          dates: [new Date(firstSabbath)],
          dateRangeText: `${theDate.toDateString()}`,
        };
        sabbathSpread.push(spreadedHolyDay);
        firstSabbath.setDate(firstSabbath.getDate() + 7);
      }
    } else if (holyDay.isNewMoons) {
      holyDay.dates = lunar.phase_range(
        firstDayOfTheYear,
        nextYear,
        lunar.PHASE_FULL,
      ) as any;
      holyDay.dates.forEach(day => {
        const spreadedHolyDay = {
          ...holyDay,
          dates: [day],
          dateRangeText: `${day.toDateString()}`,
        };
        newMoonSpread.push(spreadedHolyDay);
      });
    } else if (!holyDay.isPentacost) {
      const hold = new Date(firstDayOfTheYear);
      hold.setDate(hold.getDate() - 1);
      const startingDate = lunar.full_moons_after(hold, holyDay.month).pop();

      startingDate.setDate(startingDate.getDate() + holyDay.day - 1);
      const endingDate = new Date(startingDate);
      endingDate.setDate(endingDate.getDate() + holyDay.duration - 1);
      holyDay.dateRangeText = startingDate.toDateString();

      if (holyDay.duration > 1) {
        holyDay.startingDate = startingDate;
        holyDay.endingDate = endingDate;
        holyDay.dateRangeText = `${startingDate.toDateString()} - ${endingDate.toDateString()}`;
      }
      holyDay.dates = getDaysArray(startingDate, endingDate);
    }
  });

  // Feast of First Fruit (Pentacost) is oserved 50 days after the first Sabbath that follows the beginning of the Feast of Unleavened Bread.

  const firstSabbathAfterPassover = getNextSabbathOfDate(
    holyDays.passover.startingDate as any,
  );
  firstSabbathAfterPassover.setDate(firstSabbathAfterPassover.getDate() + 50);
  holyDays.feastOfFirstFruits.dates.push(firstSabbathAfterPassover);

  if (spreadByDate) {
    const spreadedHolyDays = [
      ...Object.values(holyDays)?.filter(
        holyDay => !holyDay.isNewMoons && !holyDay.isWeeklySabbath,
      ),
      ...newMoonSpread,
      ...sabbathSpread,
    ];
    spreadedHolyDays.sort(
      (holyDay1: any, holyDay2: any) => holyDay1.dates[0] - holyDay2.dates[0],
    );
    return spreadedHolyDays;
  }
  return holyDays;
};

export * from './types';
