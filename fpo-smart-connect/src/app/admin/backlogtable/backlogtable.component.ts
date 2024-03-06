import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backlogtable',
  templateUrl: './backlogtable.component.html',
  styleUrls: ['./backlogtable.component.css']
})
export class BacklogtableComponent implements OnInit {
  getAllData: any;
  dataList: any;
  viewData: any = [];

  constructor(private service: RootAdminService,private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDetails();

  }
  getAllDetails() {
    this.service.getData().subscribe(result => {
      this.getAllData= result;
      console.log(result,"result");
      
    })
  }

  viewDetails(details: any) {
    this.dataList = details;
    this.viewData = this.dataList

  }

  deleteOldRow(details:any){
    if(confirm('Are you sure to delete ?')){
      this.service.deleteOldRow(details).subscribe(result => {
        if (result) {
          this.toastr.success('Deleted successfully')
          this.getAllDetails();
        }
      });
    }
  }
}
