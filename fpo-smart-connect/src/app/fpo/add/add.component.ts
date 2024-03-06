import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  fetchedFarmerData: any;
  farmerDetailsTableShow = true;
  otpSent = false
  confirmStatus = false

  bankName: any
  bankAccNo: any
  ifscCode: any
  altMobNo: any
  crop: any
  variety: any
  areaOnHold: any
  cropData: any
  varietyData: any
  cropVarietySelected = [] as any
  fetchedFarmerDataAddress: any
  bankNames: any
  hiddenMob:any
  constructor(private appServ: AppService, private adminServ: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  searchFarmer(farmerId: any) {
    this.adminServ.getFarmerDetails(farmerId).subscribe(
      data => {
        if (data.status == 'success') {
          this.fetchedFarmerData = JSON.parse(data.data)
          // //console.log(this.fetchedFarmerData,"fetchedFarmerDataaaaaaaa");
          
          this.hiddenMob=this.fetchedFarmerData.VCHMOBILENO1.substring(0,5)+"****"
          // this.hiddenMob=8895302627
          this.fetchedFarmerDataAddress = data.address
          this.farmerDetailsTableShow = true
        } else {
          this.toastr.error('Unexpected error')
        }

      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )
  }

  sendOtp() {
    this.adminServ.sendOtpForAddingFpoMember(this.fetchedFarmerData.VCHMOBILENO1).subscribe(
      data => {
        if (data) {
          this.toastr.success("OTP sent")
          this.otpSent = true
        }
      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )

  }

  confirmOtp(otpValue: any) {
    this.adminServ.confirmOtpForAddMember(otpValue).subscribe(
      data => {
        if (data.match == true) {
          this.confirmStatus = true
          this.farmerDetailsTableShow = false //After OTP matched successfully
          this.getCropData() //After OTP matched successfully
          this.getBankData()
        } else {
          this.toastr.warning('Otp mismatch')
        }

      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )

  }

  getBankData() {
    this.adminServ.getBankData().subscribe(
      data => {
        if (data) {
          this.bankNames = data
        }
      }
    )
  }

  getCropData() {
    this.adminServ.getCropData().subscribe(
      data => {
        // ////console.log(data);
        this.cropData = data

      }

    )
  }

  loadVariety() {
    // ////console.log(22,this.crop);
    this.adminServ.loadVariety(this.crop.Crop_Code).subscribe(
      data => {
        // ////console.log(data);
        this.varietyData = data

      }
    )

  }

  cropVarietyArrayPush() {
    let data = { crop: this.crop.Crop_Name, variety: this.variety , areaOnHold: this.areaOnHold,}
    this.cropVarietySelected.push(data)
    this.crop = undefined,
      this.variety = undefined
  }

  removeCropFromArray(crop: any, variety: any) {
    const filteredPeople = this.cropVarietySelected.filter((item: any) => item.variety != variety);
    this.cropVarietySelected = filteredPeople
  }

  finalSubmit() {
    if (confirm('Are you sure to submit ?')) {
      let data = {
        fpoId: this.appServ.fpoId,
      
        bankName: this.bankName,
        bankAccNo: this.bankAccNo,
        ifscCode: this.ifscCode,
        altMobNo: this.altMobNo,
       
       
        
        
      }

      let farmerData={
        fullFarmerData:this.fetchedFarmerData,
           additionalData:data,
           farmerId:this.fetchedFarmerData.NICFARMERID,
           farmerName:this.fetchedFarmerData.VCHFARMERNAME,
           gender:this.fetchedFarmerData.GENDER,
           cropData: this.cropVarietySelected,
           addedBy:'FPO'
          //  farmerForwardToFpoOrFig:{fpoName:}

          
      }
   
      this.adminServ.finalSubmit(farmerData).subscribe(
        data => {
          if (data.status == 1) {
            this.toastr.success("Submitted Successfully")
            this.fetchedFarmerData = ''
            this.bankName = ''
            this.bankAccNo = ''
            this.ifscCode = ''
            this.altMobNo = ''
            this.crop = ''
            this.variety = ''
            this.areaOnHold = ''
            this.confirmStatus = false
            this.cropVarietySelected = []
          } else if (data.status == 'duplicate') {
            this.toastr.info('Data already exists')
          }
          else {
            this.toastr.error("Unexpected error")
          }
        },
        error => {
          this.toastr.error('Server error')
        }
      )
    }

  }

}
