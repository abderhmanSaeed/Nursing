import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../../../../data/service/requests/requests.service';
import { ApiResponse, Lookup, Requests } from '../../../../shared/models';
import { LookupsService } from '../../../../data/service/lookups.service';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JS

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  @ViewChild('addRequestModal') addRequestModal: TemplateRef<any> | undefined;

  requests: Requests[] = [];
  tenantId = 'cc17f35c-e68e-4731-afd7-890ca46f741d'; // Example tenantId

  searchTerm: string = '';
  selectedRoleId: string = ''; // Variable to hold the selected role ID
  currentPage = 1;
  itemsPerPage = 1; // Show one request per page

  options = ['Option 1', 'Option 2', 'Option 3'];
  selectedOptions: string[] = [];
  Patients: Lookup[] = [];


  constructor( private authService: AuthService, private modalService: NgbModal,
    private requestsService :RequestsService,
    private lookupsService: LookupsService,
  ) { }

  ngOnInit() {
    this.getAllRequests();

  }

  getAllRequests() {
    this.requestsService.getAllRequests(this.tenantId).subscribe({
      next: (response: ApiResponse<Requests[]>) => {
        if (response.Success && response.Data) {
          this.requests = response.Data;
        } else {
          console.error('Failed to load users:', response.Message);
        }
      },
      error: (error) => {
        console.error('There was an error fetching the users:', error);
      }
    });
  }



}
