// user.model.ts
export interface User {
  UserKey: string;
  GroupId: number | null;
  RoleId: number;
  UserLocation: string;
  FullName: string;
  NameAr: string;
  NameEn: string;
  Roles:string[];
  Token: string;
  Phones: string[];
  BirthDate: string;
  NationalId: string;
  Age: number;
  AgeRangeId: number;
  HasAttendanceToday: boolean;
  IsMale: boolean;
  AttedanceRatio: number;
  CountryId: number | null;
  CountryName: string | null;
  Email: string;
  Activated: boolean | null;
  AttendanceCount: number;
}

// Optionally, if you want to specifically type the 'Data' field for the GetAllUsers response:
export type UsersResponse = User[];
