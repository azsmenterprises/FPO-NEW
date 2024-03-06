import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-demand-approve',
  templateUrl: './demand-approve.component.html',
  styleUrls: ['./demand-approve.component.css'],
})
export class DemandApproveComponent implements OnInit {
  figapproveIndentDetail: any;
  indentapprovefigIndent: any;
  viewIndex: any;
  figIndentDetail: any;
  year = new Date().getFullYear();
  showTable: any;
  viewIndentDetails: any;
  indentDataToApprove: any;
  indentDataToReject: any
  agree: any
  publish: any


  constructor(
    private adminservice: AdminService,
    private toastr: ToastrService,
    private appServ: AppService
  ) {
  }

  ngOnInit(): void { }

  demandApproveForm = new FormGroup({
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl(),
    fpoId: new FormControl(),
  });

  indentapprovefigindent() {
    // ////console.log('from component ts');
    this.demandApproveForm.patchValue({
      fpoId: this.appServ.fpoId,
    });
    this.adminservice
      .indentapprovefigindent(this.demandApproveForm.value)
      .subscribe((data) => {
        this.indentapprovefigIndent = data;
        this.showTable = this.demandApproveForm.value.type;
      });
  }

  getIndentViewIndex(index: any) {
    this.viewIndex = index;
    let data = this.indentapprovefigIndent[index];
    data.fpoId = this.appServ.fpoId;
    data.itemType = this.showTable;
    this.adminservice.figapproveindentdetail(data).subscribe((data) => {
      // ////console.log(data);
      this.figapproveIndentDetail = data;

    });
  }

  getIndentApproveData(data: any) {
    this.indentDataToApprove = data;
  }


  checkBox1() {
    this.publish = false
  }
  checkBox2() {
    this.agree = false
  }

  approveIndent() {
    this.indentDataToApprove.fpoId = this.appServ.fpoId;
    this.indentDataToApprove.type = this.demandApproveForm.value.type;
    this.indentDataToApprove.agreeForElicense = this.agree
    this.indentDataToApprove.dontPublishInElicense = this.publish
    // ////console.log(555, this.indentDataToApprove);

    this.adminservice.approveIndent(this.indentDataToApprove).subscribe(
      (data) => {
        if (data.status != 0 || data.status != 'undefined' || data.status != 'null') {
          this.indentapprovefigindent();
          this.toastr.success('Approved Successfully');
        } else {
          this.toastr.warning('Approve Unseccessful');
        }
      },
      (error) => {
        this.toastr.error('Server Error');
      }
    );
  }

  getIndentRejectData(data: any) {
    this.indentDataToReject = data;

  }

  rejectIndent() {
    this.indentDataToReject.fpoId = this.appServ.fpoId;
    this.indentDataToReject.type = this.demandApproveForm.value.type;

    this.adminservice.rejectIndent(this.indentDataToReject).subscribe(
      (data) => {
        if (data.status != 0 || data.status != 'undefined' || data.status != 'null') {
          this.indentapprovefigindent();
          this.toastr.success('Approved Successfully');
        } else {
          this.toastr.warning('Approve Unseccessful');
        }
      },
      (error) => {
        this.toastr.error('Server Error');
      }
    );
  }

}
