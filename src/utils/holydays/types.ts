import {Scripture} from '@types';
import {ColorValue} from 'react-native';

export enum HOLYDAYS {
  WEEKLY_SABBATH = 'weeklySabbath',
  NEW_MOON = 'newMoon',
  PASSOVER = 'passover', //FEAST OF UNLEAVENED BREAD
  DAY_OF_SIMON = 'dayOfSimon',
  FEAST_OF_FIRST_FRUITS = 'feastOfFirstFruits', //PENTACOST
  MEMORIAL_BLOWING_OF_TRUMPETS = 'memorialBlowingOfTrumpets',
  DAY_OF_ATONEMENT = 'dayOfAtonement',
  FEAT_OF_TABERNACLES = 'featOfTabernacles', // FEAST OF BOOTHS
  FEAST_OF_DEDICATION = 'feastOfDedication', // Hanukkah
  DESTRUCTION_OF_NICANOR = 'destructionOfNicanor',
  PURIM = 'purim',
}

export interface IHolyDay {
  name: string;
  isWeeklySabbath?: boolean;
  isNewMoons?: boolean;
  isPentacost?: boolean; // feast of first fruit. Observed 50 days after the first Sabbath that follows the beginning of the Feast of Unleavened Bread.
  month: number;
  day: number;
  duration: number;
  startingDate?: Date;
  endingDate?: Date;
  dates: Date[];
  observation: IHolyDayObservation[];
  scriptures: Scripture[];
  color?: ColorValue;
  dateRangeText?: string;
}
export interface IHolyDayObservation {
  isNonRegSabbath?: boolean;
  description: string[];
}
