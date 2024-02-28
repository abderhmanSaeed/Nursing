import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiResponse, User } from '../../../../shared/models';
import { UserService } from '../../../../data/service/user/user.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  selectedRoleId: string = ''; // Variable to hold the selected role ID
  currentPage = 1;
  itemsPerPage = 1; // Show one user per page

  constructor(private userService: UserService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
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

  get filteredUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.filter(user => {
      const nameToCheck = this.getCurrentName(user);
      const matchesNameOrPhone = !this.searchTerm || user.PhoneList.some(phone => phone.includes(this.searchTerm)) ||
        (nameToCheck && nameToCheck.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesRole = !this.selectedRoleId || user.RoleId.toString() === this.selectedRoleId;
      return matchesNameOrPhone && matchesRole;
    }).slice(startIndex, startIndex + this.itemsPerPage);
  }

  getCurrentName(user: User): string {
    const currentLang = this.authService.getCurrentLanguage();
    return currentLang === 'ar' ? user.NameAr : user.NameEn;
  }

  openModal() {
    this.modalService.open(this.addUserModal);
  }

  nextPage() {
    const totalItems = this.filteredUsers.length;
    // if (this.currentPage <= totalItems) { // Simplified condition
    // }
    this.currentPage++;
}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  filterByRole() {

  }

}
