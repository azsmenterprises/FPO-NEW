import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

import { ConsumerGroupService } from '../consumer-group.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private cgService :ConsumerGroupService, private appServ :AppService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTrader()
  }
traderData:any

  traderDetailsForm = new FormGroup({
    traderState: new FormControl(''),
    districtName: new FormControl(''),
    traderDistCode: new FormControl(''),
    traderPin: new FormControl(''),
    traderCity:new FormControl(''),
    traderPlot: new FormControl(''),
    Block: new FormControl(''),
    
    Address: new FormControl(''),
    cgMobNo: new FormControl(''),
    
    // Crop_Name: new FormControl([]),
    
    traderMail: new FormControl(''),
    traderLandmark :new FormControl(''),
    panNo: new FormControl(''),
    

  })
getTrader(){
  this.cgService.getTrader(this.appServ.cgRefNo ).subscribe(
    data => {

      this.traderData = data
     ////////console.log(this.traderData);
     this.traderDetailsForm.patchValue(this.traderData)
     
      
   
    }
  )
}


updateTrader() {
  // ////////console.log(this.traderDetailsForm.value,4444);
  
  this.cgService.updateTrader(this.appServ.cgRefNo,this.traderDetailsForm.value).subscribe(

      data => {
         ////////console.log(data,5555555);
        if (data.msg == 'Updated Successfully') {
          this.toastr.success(data.msg)         
        } else {
          this.toastr.warning(data.msg)

        }
      }
    )  
  }
}
