import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiResponse, Lookup } from '../../../../shared/models';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupsService } from '../../../../data/service/lookups.service';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JS
import { Days } from '../../../../shared/Enums';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../../../../data/service/requests/requests.service';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrl: './manage-requests.component.scss'
})
export class ManageRequestsComponent implements OnInit {

  @ViewChild('addRequestModal') addRequestModal: TemplateRef<any> | undefined;

  requests: Request[] = [];
  searchTerm: string = '';
  selectedNurseId: any;  // Variable to hold the selected role ID
  currentPage = 1;
  itemsPerPage = 10; // Show one request per page

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
  requestForm!: FormGroup; // Using definite assignment assertion
  fullName: string = '';
  nationalId: string = '';
  phone1: string = '';
  phone2: string = '';
  selectedRole: any;
  selectedGender: string = '';
  birthday: string = '';
  address: string = '';
  requestName: string = '';
  email: string = '';
  password: string = '';
  days: any = {};
  photo: string = '';
  request = {
    fullName: '',
    nationalId: '',
    phone1: '',
    phone2: '',
    selectedRole: '',
    selectedGender: '',
    birthday: '',
    address: '',
    requestName: '',
    email: '',
    password: '',
    selectedServices: '',
    selectedShifts: '',
    days: {},
    photo: ''
  };

  constructor(private requestService: RequestsService, private authService: AuthService, private modalService: NgbModal,
    private lookupsService: LookupsService, private formBuilder: FormBuilder) {
    // Initialize maxStartDate with today's date
    const today = new Date();
    this.maxStartDate = today.toISOString().split('T')[0];
    this.daysArray = Object.entries(Days);
  }

  ngOnInit() {
    this.getAllRequests();
    this.initForm();

  }

  initForm(): void {
    this.requestForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      nationalId: ['', Validators.required],
      tenantId: [this.tenantId],
      phones1: ['', Validators.required], // Initialize the form array for phones
      phones2: [''], // Initialize the form array for phones
      isMale: [true, Validators.required],
      birthDate: ['', Validators.required],
      requestLocation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      requestName: ['', Validators.required],
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
    if (this.requestForm.valid) {
      const formData = this.requestForm.value as Request;
      console.log(formData); // You can now send this data to your backend or use it as needed
    } else {
      // Handle form validation errors
    }
  }
  // Method to add a new phone control to the phones form array
  addPhone(): void {
    (this.requestForm.get('phones') as FormArray).push(this.formBuilder.control('', Validators.required));
  }
  addRequest() {
    // Dynamically create the request object using values from the console logs
    const request = {
      fullName: this.fullName,
      nationalId: this.nationalId,
      phones: [this.phone1, this.phone2],
      isMale: this.selectedGender === "Male",
      birthDate: this.birthday,
      requestLocation: this.address,
      email: this.email,
      requestName: this.requestName,
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
      }).filter(Boolean),      currentLat: 50.503887, // Assuming currentLat and currentLong are not available from console logs
      currentLong: 4.469936, // Assuming currentLat and currentLong are not available from console logs
    };

    // Log the dynamically created request object
    console.log('Request object:', request);

    // Call the API to add the request
    // this.requestService.addRequest(request)
    //   .subscribe(
    //     (response) => {
    //       console.log('Request added successfully:', response);
    //       // Handle success response
    //     },
    //     (error) => {
    //       console.error('Error adding request:', error);
    //       // Handle error response
    //     }
    //   );
  }


  getAllRequests() {
    this.requestService.getAllRequests(this.tenantId).subscribe({
      next: (response: ApiResponse<Request[]>) => {
        if (response.Success && response.Data) {
          this.requests = response.Data;
        } else {
          console.error('Failed to load requests:', response.Message);
        }
      },
      error: (error) => {
        console.error('There was an error fetching the requests:', error);
      }
    });
  }
  

  handleInputChange(value: string) {
    // Here you can access the emitted value and perform actions
    this.searchTerm = value;
  }

 

  



  getCurrentName(request: Request): string {
    const currentLang = this.authService.getCurrentLanguage();
    return currentLang === 'ar' ? request.NameAr : request.NameEn;
  }

  openModal() {

    this.modalService.open(this.addRequestModal, { size: 'lg' });
  }

  

  nextPage() {
    const totalItems = this.filteredRequests.length;
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
    console.log(this.selectedNurseId); // Access the selected role Id here
    // You can perform further actions with the selected role Id
  }

  onSellerSelected(event: any) {

    this.selectedNurseId = event;
    console.log('selected Role Id:', this.selectedNurseId); // event contains the selected seller's data
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

