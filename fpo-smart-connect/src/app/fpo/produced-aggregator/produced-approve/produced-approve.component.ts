import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-produced-approve',
  templateUrl: './produced-approve.component.html',
  styleUrls: ['./produced-approve.component.css'],
})
export class ProducedApproveComponent implements OnInit {
  constructor(
    private adminservice: AdminService,
    private appServ: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  figIndents: any;
  rejectIndex: any;
  approveIndex: any;
  viewData: any;
  figProducedDetail: any;
  year = new Date().getFullYear();

  producedApproveForm = new FormGroup({
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    fpoId: new FormControl(),
  });

  figProducedData() {
    this.producedApproveForm.patchValue({
      fpoId: this.appServ.fpoId,
    });
    this.adminservice
      .figProducedData(this.producedApproveForm.value)
      .subscribe((data) => {
        // ////console.log(data);
        this.figIndents = data;
      });
  }

  getViewData(data: any) {
    this.viewData = data;
    this.adminservice.viewFigProducedDetails(data).subscribe((data) => {
      this.figProducedDetail = data;
    });
  }

  getApproveIndex(index: any) {
    this.approveIndex = index;
  }
  approveFigProducedData() {
    let data = this.figIndents[this.approveIndex];
    data.fpoId = this.appServ.fpoId;
    this.adminservice.approveFigProducedData(data).subscribe((data) => {
      if (data.status != 0) {
        this.toastr.success('Successfully approved');
        this.figProducedData();
        this.producedApproveForm.reset();
      }
    });
  }

  rejectListIndex(index: any) {
    this.rejectIndex = index;
  }

  rejectList() {
    let data = this.figIndents[this.rejectIndex];
    data.fpoId = this.appServ.fpoId;
    this.adminservice.rejectList(data).subscribe((data) => {
      if (data.status != 0) {
        this.toastr.success('Successfully rejected');
        this.figProducedData();
        this.producedApproveForm.reset();
      }
    });
  }
}
