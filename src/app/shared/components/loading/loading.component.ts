import { LoadingService } from './../../../core/service/loading/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  loading$ = this.loadingService.loading$;
  bdColor: string = '#fff';

  constructor(private loadingService: LoadingService) {}
}
