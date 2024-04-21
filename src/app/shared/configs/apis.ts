import { environment } from "../../../environments/environment";

export class APIs {

    // Base URL
    public static APIsBaseURL = environment.apiEndPoint;

    // Auth APIs
    public static login = '/Account/SignIn';
    // users APIs
    public static getAllUsers = '/Users'; // Ensure this line is added
    public static addUser = '/Users'; // Ensure this line is added


     // requests APIs
     public static getAllRequests = '/Requests'; // Ensure this line is added
     public static addRequest = '/Requests'; // Ensure this line is added


    // lookup APIs
    public static getAllRoles = '/Roles';
    public static getAllServices = '/Services';
    public static getAllShifts = '/Shifts';
    public static getAllPatients = '/Patients';

}
