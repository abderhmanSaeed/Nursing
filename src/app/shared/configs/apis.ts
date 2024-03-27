import { environment } from "../../../environments/environment";

export class APIs {

    // Base URL
    public static APIsBaseURL = environment.apiEndPoint;




    // Auth APIs
    public static login = '/Account/SignIn';



    // users APIs
    public static getAllUsers = '/User/GetAllUsers'; // Ensure this line is added

}
