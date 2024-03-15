import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JS

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  @ViewChild('addRequestModal') addRequestModal: TemplateRef<any> | undefined;

  requests: Request[] = [];
  searchTerm: string = '';
  selectedRoleId: string = ''; // Variable to hold the selected role ID
  currentPage = 1;
  itemsPerPage = 1; // Show one request per page

  options = ['Option 1', 'Option 2', 'Option 3'];
  selectedOptions: string[] = [];

  

  constructor( private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
  }

}
