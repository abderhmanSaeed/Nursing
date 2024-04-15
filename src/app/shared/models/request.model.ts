export interface Requests {
  id: string;
  patientId: string;
  serviceIds: string[];
  services: string[];
  tenantId: string;
  assignedUserIds: string[];
  assignedUsers: string[];
  requestNumber: string;
  statusId: number;
  visitTimeFrom: {
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
  visitTimeTo: {
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
  visitDate: string;
  gender: number;
  location: string;
  lat: number;
  long: number;
  notes: string;
}


// Optionally, if you want to specifically type the 'Data' field for the GetAllUsers response:
export type RequestResponse = Requests[];
