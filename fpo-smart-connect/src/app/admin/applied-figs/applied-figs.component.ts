import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';

@Component({
  selector: 'app-applied-figs',
  templateUrl: './applied-figs.component.html',
  styleUrls: ['./applied-figs.component.css']
})
export class AppliedFigsComponent implements OnInit {

  constructor(private service: RootAdminService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getFigRegisterData()
  }

  figRegData:any

  getFigRegisterData(){
    this.service.getFigRegisterData().subscribe(
      data=>{
        this.figRegData=data
      }
    )
  }

  approveFig(data:any){
    if(confirm('Are sure to approve ?')){
      this.service.approveFig(data).subscribe(
        data=>{
          if(data.status==1){
            this.toastr.success('Approved Successfully','Success')
            this.getFigRegisterData()
          }
          if(data.status==0){
            this.toastr.info('Already approved','Warning')
          }
        },
        error=>{
          this.toastr.error('Unexpected Error')
        }
      )
    }
  }

  reject(data:any){
    if(confirm('Are sure to reject ?')){
      this.service.rejectFig(data).subscribe(
        data=>{
          if(data.status==1){
            this.toastr.success('Rejected Successfully','Success')
          }
          if(data.status==0){
            this.toastr.info('Already Rejected','Warning')
          }
        },
        error=>{
          this.toastr.error('Unexpected Error')
        }
      )
    }
  }

}
