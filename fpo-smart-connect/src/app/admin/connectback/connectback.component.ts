import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connectback',
  templateUrl: './connectback.component.html',
  styleUrls: ['./connectback.component.css']
})
export class ConnectbackComponent implements OnInit {
  dataList: any;
  viewData: any = [];
  getgrievanceData: any;

  constructor(private service: RootAdminService,private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getConnectDetails();

  }



   getConnectDetails() {
    this.service.getgrievanceData().subscribe(result => {
      this.getgrievanceData= result;
      console.log(result,"result");
      
    })
  }

  viewDetails(details: any) {
    this.dataList = details;
    this.viewData = this.dataList

  }

}
