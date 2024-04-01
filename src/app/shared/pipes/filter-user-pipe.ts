import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], searchTerm: string = '', selectedRoleId: string = ''): User[] {
    if (!users) return [];
    if (!searchTerm && !selectedRoleId) return users;

    return users.filter(user => {
      const matchesNameOrPhone = !searchTerm || user.Phones.some(phone => phone.includes(searchTerm)) ||
        (user.NameEn && user.NameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.NameAr && user.NameAr.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRole = !selectedRoleId || user.RoleId.toString() === selectedRoleId;
      return matchesNameOrPhone && matchesRole;
    });
  }
}
