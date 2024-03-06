import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FigServiceService } from '../fig-service.service';

@Component({
  selector: 'app-applied-farmers',
  templateUrl: './applied-farmers.component.html',
  styleUrls: ['./applied-farmers.component.css']
})
export class AppliedFarmersComponent implements OnInit {

  constructor(private figservice:FigServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getfarmerRegData()
  }

  farmerRegData:any
  dataToApprove:any

  getfarmerRegData(){
    this.figservice.getfarmerRegData().subscribe(
      data=>{
        this.farmerRegData=data
      }
    )
  }

// get data to approve
  getApproveDataForApprove(data:any){
    this.dataToApprove=data
  }

  approve(){
    this.figservice.approve(this.dataToApprove).subscribe(
      data=>{
        if(data.status==1){
          this.toastr.success('Approved successfully')
          this.getfarmerRegData()
        }else{
          this.toastr.warning('Already approved')
        }
      }
    )
  }

  forwardToFpo(){
    this.figservice.forwardToFpo(this.dataToApprove).subscribe(
      data=>{
        if(data.status==1){
          this.toastr.success('Forwarded successfully')
          this.getfarmerRegData()
        }else{
          this.toastr.warning('Already Forwarded')
        }
      }
    )
  }

}
