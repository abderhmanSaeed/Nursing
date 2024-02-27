import { Component, OnInit } from '@angular/core';
import { ApiResponse, User } from '../../../../shared/models';
import { UserService } from '../../../../data/service/user/user.service';
import { AuthService } from '../../../../core/service/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response: ApiResponse<User[]>) => {
        if (response.Success && response.Data) {
          this.users = response.Data;
        } else {
          // Handle the case where the API call was not successful or returned no data
          console.error('Failed to load users:', response.Message);
        }
      },
      error: (error) => {
        console.error('There was an error fetching the users:', error);
      }
    });
  }

  get filteredUsers() {
    if (!this.searchTerm) {
      return this.users;
    }
    return this.users.filter(user => {
      const nameToCheck = this.getCurrentName(user);
      return (
        user.PhoneList.some(phone => phone.includes(this.searchTerm)) ||
        (nameToCheck && nameToCheck.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    });
  }
  // In your component class
  getCurrentName(user: any): string {
    const currentLang = this.authService.getCurrentLanguage();
    return currentLang === 'ar' ? user.NameAr : user.NameEn;
  }


}
