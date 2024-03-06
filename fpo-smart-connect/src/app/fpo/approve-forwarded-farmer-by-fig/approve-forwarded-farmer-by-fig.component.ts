import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-approve-forwarded-farmer-by-fig',
  templateUrl: './approve-forwarded-farmer-by-fig.component.html',
  styleUrls: ['./approve-forwarded-farmer-by-fig.component.css'],
})
export class ApproveForwardedFarmerByFigComponent implements OnInit {
  constructor(
    private appServ: AppService,
    private adminServ: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllForwardedFarmer();
  }

  layout1Show = false;
  farmerDataForEdit: any;
  approveIndex: any;

  getAllForwardedFarmer() {    
    this.adminServ
      .getAllForwardedFarmer(this.appServ.fpoId)
      .subscribe((data) => {
        this.layout1Show = true;
        this.farmerDataForEdit = data;
        //console.log(data,"farmer data");
        
      });
  }

  getApproveIndex(index: any) {
    this.approveIndex = index;
  }
  approveFarmer() {
    let data = {
      farmerId: this.farmerDataForEdit[this.approveIndex].farmerId,
      farmerName: this.farmerDataForEdit[this.approveIndex].farmerName,
      mobileNo: this.farmerDataForEdit[this.approveIndex].fullFarmerData.VCHMOBILENO,
    };
    this.adminServ.approveForwardedFarmer(data).subscribe((data) => {
      if (data.status == 1) {
        this.toastr.success('Forwarded successfully');
        this.getAllForwardedFarmer();
      } else {
        this.toastr.error('Error');
      }
    });
  }
}
