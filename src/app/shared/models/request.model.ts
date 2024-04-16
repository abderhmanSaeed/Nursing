export interface Requests {
  Id: string;
  PatientName: string;
  PatientId: string;
  PatientPhone:string;
  ServiceIds: string[];
  Services: string[];
  TenantId: string;
  AssignedUserIds: string[];
  AssignedUsers: string[];
  RequestNumber: string;
  StatusId: number;
  VisitTimeFrom: {
    ticks: number;
    days: number;
    hours: number;
    milliseconds: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMilliseconds: number;
    totalMinutes: number;
    totalSeconds: number;
  };
  VisitTimeTo: {
    ticks: number;
    days: number;
    hours: number;
    milliseconds: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMilliseconds: number;
    totalMinutes: number;
    totalSeconds: number;
  };
  VisitDate: string;
  Gender: number;
  Location: string;
  Lat: number;
  Long: number;
  Notes: string;
}

// Optionally, if you want to specifically type the 'Data' field for the GetAllUsers response:
export type RequestResponse = Requests[];
