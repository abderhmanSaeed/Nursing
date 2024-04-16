export const Days = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7
} as const;

export type Day = typeof Days[keyof typeof Days];

export const daysArray = Object.entries(Days);
