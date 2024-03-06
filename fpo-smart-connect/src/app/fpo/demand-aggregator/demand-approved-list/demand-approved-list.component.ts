import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-demand-approved-list',
  templateUrl: './demand-approved-list.component.html',
  styleUrls: ['./demand-approved-list.component.css']
})
export class DemandApprovedListComponent implements OnInit {

  constructor(private adminservice: AdminService,
    private appServ: AppService) { }

  ngOnInit(): void {
  }
  figIndentList: any;
  year = new Date().getFullYear();
  showTable: any

  demandApproveForm = new FormGroup({
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl(),
    fpoId: new FormControl(),
  });

  approvedDemand() {
    this.demandApproveForm.patchValue({
      fpoId: this.appServ.fpoId,
    });
    this.adminservice
      .approvedDemand(this.demandApproveForm.value)
      .subscribe((data) => {
        this.showTable = this.demandApproveForm.value.type
        this.figIndentList = data;
      });
  }

}
