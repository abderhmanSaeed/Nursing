import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiResponse, Lookup, User, UsersResponse } from '../../../../shared/models';
import { UserService } from '../../../../data/service/user/user.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupsService } from '../../../../data/service/lookups.service';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JS
import { Days } from '../../../../shared/Enums';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  @ViewChild('addUserModal') addUserModal: TemplateRef<any> | undefined;

  users: User[] = [];
  totalItems = 0;

  pageSize: number = 10; // Change this value as needed
  searchTerm: string = '';
  selectedRoleId: any;  // Variable to hold the selected role ID
  currentPage = 1;
  itemsPerPage = 10; // Show one user per page

  genders = ['Male', 'Female'];
  selectedOptions: string[] = [];
  selectedRoles: string[] = [];
  selectedServices: any[] = [];
  selectedShifts: any[] = [];
  tenantId = 'cc17f35c-e68e-4731-afd7-890ca46f741d'; // Example tenantId
  showCopiedMessage: boolean = false;
  Roles: Lookup[] = [];
  Services: Lookup[] = [];
  Shifts: Lookup[] = [];
  Days = Days;
  daysArray: [string, number][]; // Declare daysArray here

  maxStartDate: string;
  userForm!: FormGroup; // Using definite assignment assertion
  fullName: string = '';
  nationalId: string = '';
  phone1: string = '';
  phone2: string = '';
  selectedRole: any;
  selectedGender: string = '';
  birthday: string = '';
  address: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  passwordsMatch: boolean = true;
  days: any = {};
  photo: string = '';
  user = {
    fullName: '',
    nationalId: '',
    phone1: '',
    phone2: '',
    selectedRole: '',
    selectedGender: '',
    birthday: '',
    address: '',
    userName: '',
    email: '',
    password: '',
    selectedServices: '',
    selectedShifts: '',
    days: {},
    photo: ''
  };
  isShowPassword: boolean = false

  constructor(private userService: UserService, private authService: AuthService, private modalService: NgbModal,
    private lookupsService: LookupsService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    // Initialize maxStartDate with today's date
    const today = new Date();
    this.maxStartDate = today.toISOString().split('T')[0];
    this.daysArray = Object.entries(Days);
  }

  ngOnInit() {
    this.getAllUsers();
    this.loadLookups();
    this.initForm();

  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      nationalId: ['', Validators.required],
      tenantId: [this.tenantId],
      phones1: ['', Validators.required], // Initialize the form array for phones
      phones2: [''], // Initialize the form array for phones
      isMale: [true, Validators.required],
      birthDate: ['', Validators.required],
      userLocation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleIds: this.formBuilder.array([]),
      serviceIds: this.formBuilder.array([]),
      WorksingDays: this.formBuilder.array([]),
      WorkingShifts: this.formBuilder.array([]),
      currentLat: [50.503887],
      currentLong: [4.469936]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value as User;
      console.log(formData); // You can now send this data to your backend or use it as needed
    } else {
      // Handle form validation errors
    }
  }
  checkPassword() {
    // Check if passwords match
    this.passwordsMatch = this.password === this.repeatPassword;
  }
  // Method to add a new phone control to the phones form array
  addPhone(): void {
    (this.userForm.get('phones') as FormArray).push(this.formBuilder.control('', Validators.required));
  }
  addUser() {
    // Dynamically create the user object using values from the console logs
    const user = {
      fullName: this.fullName,
      nationalId: this.nationalId,
      tenantId: this.tenantId,
      phones: [this.phone1, this.phone2],
      isMale: this.selectedGender === "Male",
      birthDate: this.birthday,
      userLocation: this.address,
      email: this.email,
      userName: this.userName,
      password: this.password,
      roleIds: this.selectedRole.map((role: { Id: any; }) => role.Id),
      serviceIds: this.selectedServices.map(service => service.Id),
      workingShifts: this.selectedShifts.map(shift => shift.Id),
      worksingDays: Object.keys(this.days).filter(day => this.days[day]).map(day => {
        switch (day) {
          case 'Mon':
            return 1;
          case 'Tue':
            return 2;
          case 'Wed':
            return 3;
          case 'Thu':
            return 4;
          case 'Fri':
            return 5;
          case 'Sat':
            return 6;
          case 'Sun':
            return 7;
          default:
            return null; // Handle unknown days if needed
        }
      }).filter(Boolean), currentLat: 50.503887, // Assuming currentLat and currentLong are not available from console logs
      currentLong: 4.469936, // Assuming currentLat and currentLong are not available from console logs
    };

    // Log the dynamically created user object
    console.log('User object:', user);

    // Call the API to add the user
    this.userService.addUser(user)
      .subscribe(
        (response: any) => {
          console.log('User added successfully:', response);
          // Handle success response
          // Handle success response
          if (response && response.Success) {
            this.getAllUsers();
            // Close the modal
            this.modalService.dismissAll();
            // Show snackbar for 5 seconds
            const currentLang = this.authService.getCurrentLanguage();
            this.showSnackBar(currentLang === 'ar' ? 'تم اضافة المستخدم' :'User added successfully!', 'Close', 5000);          }
        },
        (error) => {
          console.error('Error adding user:', error);
          // Handle error response
        }
      );
  }
  showSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  getAllUsers() {
    this.userService.getAllUsers(this.tenantId).subscribe({
      next: (response: ApiResponse<UsersResponse>) => {
        if (response.Success && response.Data) {
          this.totalItems = response.Data.Total;
          this.users = response.Data.Users.slice(0, this.pageSize);
        } else {
          console.error('Failed to load users:', response.Message);
        }
      },
      error: (error) => {
        console.error('There was an error fetching the users:', error);
      }
    });
  }
  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  isFormInvalid(): boolean {
    console.log("days:", this.days);
    console.log("daysArray:", this.daysArray);

    // Check if any required field is empty
    const anyFieldEmpty =
      !this.fullName ||
      !this.nationalId ||
      !this.phone1 ||
      !this.selectedRole.length ||
      !this.selectedGender ||
      !this.birthday ||
      !this.address ||
      !this.userName ||
      !this.email ||
      !this.password ||
      !this.repeatPassword ||
      !this.selectedServices.length ||
      !this.selectedShifts.length;

    // Check if any day is selected
    const anyDaySelected = Object.values(this.days).some(daySelected => daySelected);

    // Check if password and repeat password match
    const passwordsMatch = this.password === this.repeatPassword;

    return anyFieldEmpty || !anyDaySelected || !passwordsMatch;
  }


  pages(): number[] {
    const pageCount = this.totalPages();
    const visiblePages = Math.min(pageCount, 3); // Show at most 3 pages
    const startPage = Math.max(1, this.currentPage - 1); // Start from currentPage - 1
    return Array.from({ length: visiblePages }, (_, i) => startPage + i);
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.users = this.users.slice(startIndex, startIndex + this.pageSize);
  }
  loadRoles() {
    this.lookupsService.getAllRoles(this.tenantId).subscribe(response => {
      if (response.Success) {
        this.Roles = response.Data;
      } else {
        console.error('Failed to fetch roles:', response.Message);
      }
    }, error => {
      console.error('Error fetching roles:', error);
    });
  }
  loadServices() {
    this.lookupsService.getAllServices(this.tenantId).subscribe(response => {
      if (response.Success) {
        this.Services = response.Data;
      } else {
        console.error('Failed to fetch roles:', response.Message);
      }
    }, error => {
      console.error('Error fetching roles:', error);
    });
  }
  loadShifts() {
    this.lookupsService.getAllShifts(this.tenantId).subscribe(response => {
      if (response.Success) {
        this.Shifts = response.Data;
      } else {
        console.error('Failed to fetch roles:', response.Message);
      }
    }, error => {
      console.error('Error fetching roles:', error);
    });
  }

  handleInputChange(value: string) {
    // Here you can access the emitted value and perform actions
    this.searchTerm = value;
  }

  get filteredUsers() {
    if (!this.searchTerm && !this.selectedRoleId) {
      return this.users;
    } else {
      return this.users.filter(user =>
        (!this.searchTerm || // If no search term or search term matches
          (user.FullName && user.FullName.toLowerCase().includes(this.searchTerm.toLowerCase())) || // Filter by FullName
          (user.Phones && user.Phones.some(phone => phone && phone.includes(this.searchTerm)))) && // Filter by Phones
        (!this.selectedRoleId || // If no selected role id or user has the selected role id
          (user.RoleIds && user.RoleIds.includes(this.selectedRoleId)))
      );
    }
  }

  copyUser(user: User) {
    const copiedUser = JSON.stringify(user);

    // Copy the JSON string to the clipboard
    navigator.clipboard.writeText(copiedUser)
      .then(() => {
        console.log("User copied to clipboard:", copiedUser);
        // Optionally, you can provide some feedback to the user
        // alert("User copied to clipboard!");
        // Show the copied message
        this.showCopiedMessage = true;

        // Hide the message after a delay (e.g., 3 seconds)
        setTimeout(() => {
          this.showCopiedMessage = false;
        }, 3000);
      })
      .catch(err => {
        console.error("Failed to copy user to clipboard:", err);
        // Handle any errors that occur during copying
        alert("Failed to copy user to clipboard!");
      });
  }




  getCurrentName(user: User): string {
    const currentLang = this.authService.getCurrentLanguage();
    return currentLang === 'ar' ? user.NameAr : user.NameEn;
  }

  openModal() {

    this.modalService.open(this.addUserModal, { size: 'lg' });
  }

  loadLookups() {
    this.loadRoles();
    this.loadServices();
    this.loadShifts();
  }

  nextPage() {
    const totalItems = this.filteredUsers.length;
    // if (this.currentPage <= totalItems) { // Simplified condition
    // }
    this.currentPage++;
  }

  onSelectionGenderChange(): void {
    console.log(this.selectedGender); // Do something with the selected values
  }
  onSelectionRolesChange() {
    console.log(this.selectedRole); // Do something with the selected values
  }
  onSelectionServicesChange() {
    console.log(this.selectedServices); // Do something with the selected values

  }
  onSelectionShiftsChange() {
    console.log(this.selectedShifts); // Do something with the selected values

  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  filterByRole() {
    console.log(this.selectedRoleId); // Access the selected role Id here
    // You can perform further actions with the selected role Id
  }

  onSellerSelected(event: any) {

    this.selectedRoleId = event;
    console.log('selected Role Id:', this.selectedRoleId); // event contains the selected seller's data
  }
  getNameOfDays(dayNumber: number): string {
    const currentLang = this.authService.getCurrentLanguage();
    switch (dayNumber) {
      case Days.Mon:
        return currentLang === 'en' ? 'Mon' : 'الاثنين';
      case Days.Tue:
        return currentLang === 'en' ? 'Tue' : 'الثلاثاء';
      case Days.Wed:
        return currentLang === 'en' ? 'Wed' : 'الأربعاء';
      case Days.Thu:
        return currentLang === 'en' ? 'Thu' : 'الخميس';
      case Days.Fri:
        return currentLang === 'en' ? 'Fri' : 'الجمعة';
      case Days.Sat:
        return currentLang === 'en' ? 'Sat' : 'السبت';
      case Days.Sun:
        return currentLang === 'en' ? 'Sun' : 'الأحد';
      default:
        return '';
    }


  }


}

