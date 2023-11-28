export enum BibleBook {}

export interface Scripture {
  book: BibleBook;
  chapter: number;
  verse: number;
  to: number;
}
