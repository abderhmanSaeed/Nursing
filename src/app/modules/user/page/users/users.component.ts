import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiResponse, Lookup, User } from '../../../../shared/models';
import { UserService } from '../../../../data/service/user/user.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupsService } from '../../../../data/service/lookups.service';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JS

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  @ViewChild('addUserModal') addUserModal: TemplateRef<any> | undefined;

  users: User[] = [];
  searchTerm: string = '';
  selectedRoleId: any;  // Variable to hold the selected role ID
  currentPage = 1;
  itemsPerPage = 10; // Show one user per page

  options = ['Option 1', 'Option 2', 'Option 3'];
  selectedOptions: string[] = [];
  selectedRoles: string[] = [];
  selectedServices: string[] = [];
  tenantId = 'cc17f35c-e68e-4731-afd7-890ca46f741d'; // Example tenantId
  showCopiedMessage: boolean = false;
  Roles: Lookup[] = [];
  Services: Lookup[] = [];
  Shifts: Lookup[] = [];


  constructor(private userService: UserService, private authService: AuthService, private modalService: NgbModal,
    private lookupsService: LookupsService) { }

  ngOnInit() {
    this.getAllUsers();
    this.loadLookups();
  }

  getAllUsers() {
    this.userService.getAllUsers(this.tenantId).subscribe({
      next: (response: ApiResponse<User[]>) => {
        if (response.Success && response.Data) {
          this.users = response.Data;
        } else {
          console.error('Failed to load users:', response.Message);
        }
      },
      error: (error) => {
        console.error('There was an error fetching the users:', error);
      }
    });
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
    if (!this.searchTerm) {
      return this.users;
    } else {
      return this.users.filter(user =>
        (user.FullName && user.FullName.toLowerCase().includes(this.searchTerm.toLowerCase())) || // Filter by FullName
        (user.Phones && user.Phones.some(phone => phone && phone.includes(this.searchTerm))) // Filter by Phones
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

  onSelectionChange(): void {
    console.log(this.selectedOptions); // Do something with the selected values
  }
  onSelectionRolesChange() {
    console.log(this.selectedRoles); // Do something with the selected values
  }
  onSelectionServicesChange() {
    console.log(this.selectedServices); // Do something with the selected values

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

    this.selectedRoleId = event.Id;
    console.log('selected Role Id:', this.selectedRoleId); // event contains the selected seller's data
  }

}
