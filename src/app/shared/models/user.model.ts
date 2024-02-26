// user.model.ts
export interface User {
  UserKey: string;
  GroupId: number | null;
  RoleId: number;
  NameAr: string;
  NameEn: string;
  Token: string;
  PhoneList: string[];
  BirthDate: string;
  NationalId: string;
  Age: number;
  AgeRangeId: number;
  HasAttendanceToday: boolean;
  AttedanceRatio: number;
  CountryId: number | null;
  CountryName: string | null;
  Email: string;
  Activated: boolean | null;
  AttendanceCount: number;
}
