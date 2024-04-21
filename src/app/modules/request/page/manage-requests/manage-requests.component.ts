import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiResponse, Lookup, RequestResponse, Requests } from '../../../../shared/models';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupsService } from '../../../../data/service/lookups.service';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JS
import { Days } from '../../../../shared/Enums';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../../../../data/service/requests/requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrl: './manage-requests.component.scss'
})
export class ManageRequestsComponent implements OnInit {

  @ViewChild('addRequestModal') addRequestModal: TemplateRef<any> | undefined;
  @ViewChild('editRequestModal') editRequestModal: TemplateRef<any> | undefined;
  requests: Requests[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  searchTerm: string = '';
  selectedNurseId: any;  // Variable to hold the selected role ID
  itemsPerPage = 10; // Show one request per page

  genders = ['Male', 'Female'];
  selectedOptions: string[] = [];
  selectedPatients: any = '';
  selectedServices: any[] = [];
  selectedShifts: any[] = [];
  tenantId = 'cc17f35c-e68e-4731-afd7-890ca46f741d'; // Example tenantId
  showCopiedMessage: boolean = false;
  Roles: Lookup[] = [];
  Services: Lookup[] = [];
  Shifts: Lookup[] = [];
  Days = Days;
  daysArray: [string, number][]; // Declare daysArray here
  selectedRoleId: string = ''; // Variable to hold the selected role ID

  maxStartDate: string;
  requestForm!: FormGroup; // Using definite assignment assertion
  fullName: string = '';
  nationalId: string = '';
  phone1: string = '';
  phone2: string = '';
  selectedRole: any;
  selectedGender: string = '';
  visitDate: string = '';
  visitTimeFrom: string = '';
  visitTimeTo: string = '';
  address: string = '';
  notes: string = '';
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
    visitDate: '',
    address: '',
    notes: '',
  };
  Patients: Lookup[] = [];

  constructor(private requestsService: RequestsService, private authService: AuthService, private modalService: NgbModal,
    private lookupsService: LookupsService, private formBuilder: FormBuilder,
    private requestService: RequestsService, private snackBar: MatSnackBar) {
    // Initialize maxStartDate with today's date
    const today = new Date();
    this.maxStartDate = today.toISOString().split('T')[0];
    this.daysArray = Object.entries(Days);
  }

  ngOnInit() {
    this.loadRequests();
    this.initForm();
    this.loadLookups();

  }

  initForm(): void {
    this.requestForm = this.formBuilder.group({
      tenantId: [this.tenantId],
      isMale: [true, Validators.required],
      patientId: this.formBuilder.array([]),
      serviceIds: this.formBuilder.array([]),
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
      isMale: this.selectedGender === "Male" ? 1 : 0,
      visitDate: this.visitDate,
      tenantId: this.tenantId,
      visitTimeFrom: this.visitTimeFrom,
      visitTimeTo: this.visitTimeTo,
      location: this.address,
      patientId: this.selectedPatients.Id,
      serviceIds: this.selectedServices.map(service => service.Id),
      notes: this.notes,
      statusId: 1,
      currentLat: 50.503887, // Assuming currentLat and currentLong are not available from console logs
      currentLong: 4.469936, // Assuming currentLat and currentLong are not available from console logs
    };

    // Log the dynamically created request object
    console.log('Request object:', request);

    // Call the API to add the request
    // Call the API to add the request
    this.requestService.addRequest(request)
      .subscribe(
        (response: any) => {
          console.log('Request added successfully:', response);
          // Handle success response
          if (response && response.Success) {
            this.loadRequests();

            // Close the modal
            this.modalService.dismissAll();
            // Show snackbar for 5 seconds
            const currentLang = this.authService.getCurrentLanguage();
            this.showSnackBar(currentLang === 'ar' ? 'تم اضافة الطلب' : 'Request added successfully!', 'Close', 5000);
          }
        },
        (error) => {
          console.error('Error adding request:', error);
          // Handle error response
        }
      );
  }

  showSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


  loadRequests(): void {
    this.requestsService.loadRequests(this.tenantId, this.currentPage, this.pageSize).subscribe({
      next: (response: ApiResponse<RequestResponse>) => {
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

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadRequests();
  }
  loadLookups() {
    this.loadPatients();
    this.loadServices();

  }
  loadPatients() {
    this.lookupsService.getAllPatients(this.tenantId).subscribe(response => {
      if (response.Success) {
        this.Patients = response.Data;
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

  handleInputChange(value: string) {
    // Here you can access the emitted value and perform actions
    this.searchTerm = value;
  }







  // getCurrentName(request: Request): string {
  //   const currentLang = this.authService.getCurrentLanguage();
  //   return currentLang === 'ar' ? request.NameAr : request.NameEn;
  // }

  openModal() {

    this.modalService.open(this.addRequestModal, { size: 'lg' });
  }


  openEditModal(item: any): void {
    console.log(item);
    this.selectedPatients = item.PatientId;
    this.selectedServices = item.Services;
    this.selectedGender = item.Gender === 1 ? 'Male' : 'Female';
    this.visitDate = item.visitDate;
    this.visitTimeFrom = item.visitTimeFrom;
    this.visitTimeTo = item.visitTimeTo;
    this.address = item.Location;
    this.notes = item.Notes;
    // Assuming you have an editRequestModal defined in your component
    this.modalService.open(this.editRequestModal, { size: 'lg' });
    // Now, you can set the data of the item to the modal for editing
    // Example: this.editModalData = item;
    // Then, in the modal component, you can bind the data to form fields for editing
  }
  nextPage() {
    const totalItems = this.filteredRequests.length;
    // if (this.currentPage <= totalItems) { // Simplified condition
    // }
    this.currentPage++;
  }
  get filteredRequests() {
    if (!this.searchTerm && !this.selectedRoleId) {
      return this.requests;
    } else {
      return this.requests.filter(request =>
      (!this.searchTerm || // If no search term or search term matches
        (request.PatientName && request.PatientName.toLowerCase().includes(this.searchTerm.toLowerCase())) || // Filter by FullName
        (request.PatientPhone && request.PatientPhone.toLowerCase().includes(this.searchTerm.toLowerCase()))
      ));
    }
  }

  onSelectionGenderChange(): void {
    console.log(this.selectedGender); // Do something with the selected values
  }
  onSelectionPatientsChange(): void {
    console.log(this.selectedPatients); // Do something with the selected values
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

