import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-demand-rejected-list',
  templateUrl: './demand-rejected-list.component.html',
  styleUrls: ['./demand-rejected-list.component.css']
})
export class DemandRejectedListComponent implements OnInit {

  constructor(private adminservice: AdminService, private appServ: AppService) { }

  ngOnInit(): void {
  }

  figIndentList: any;
  year = new Date().getFullYear();
  showTable: any

  demandRejectForm = new FormGroup({
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl(),
    fpoId: new FormControl(),
  });

  rejectedDemand() {
    this.demandRejectForm.patchValue({
      fpoId: this.appServ.fpoId,
    });
    this.adminservice
      .rejectedDemand(this.demandRejectForm.value)
      .subscribe((data) => {
        this.showTable = this.demandRejectForm.value.type
        this.figIndentList = data;
      });
  }

}
