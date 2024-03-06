import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-produced-rejected-list',
  templateUrl: './produced-rejected-list.component.html',
  styleUrls: ['./produced-rejected-list.component.css'],
})
export class ProducedRejectedListComponent implements OnInit {
  constructor(
    private adminservice: AdminService,
    private appServ: AppService
  ) {}

  ngOnInit(): void {}

  figIndentList: any;

  year = new Date().getFullYear();

  producedApproveForm = new FormGroup({
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    fpoId: new FormControl(),
  });

  rejectedProducedList() {
    this.producedApproveForm.patchValue({
      fpoId: this.appServ.fpoId,
    });
    this.adminservice
      .rejectedProducedList(this.producedApproveForm.value)
      .subscribe((data) => {
        // ////console.log(data);
        this.figIndentList = data;
      });
  }
}
