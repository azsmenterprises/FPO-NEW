import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  missingFpoData: any;

  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.missingFpo();

  }
  missingFpo() {
    this.service.missingFpo().subscribe(result => {
      this.missingFpoData = result;
    })
  }

  mappingofmissingData(data: any) {
    console.log(data,"tghdrhtjhtythtdjrtjsrghdrgj");
    const data1 = {
      cbboName: data.cbboName,
      fpoName: data.fpoName,
      year: data.year,
      iaName: data.iaName,
      cbboCode:data.cbboCode
    }
    this.service.mappingofmissingData(data1).subscribe(result => {
      if(result.status == true){
        this.toastr.success(result.message);
        this.missingFpo();
      }else{
        this.toastr.warning(result.message);
      }
    })
  }
  rejectMissingFpo(data:any) {
    let data1 = {
      cbboName: data.cbboName,
      fpoName: data.fpoName,
      year: data.year,
      iaName: data.iaName,
      cbboCode:data.cbboCode
    }
    this.service.rejectMissingFpo(data1).subscribe(result => {
      if(result.status == true){
        this.toastr.success(result.message);
        this.missingFpo();
      }else{
        this.toastr.warning(result.message);
      }
    })
  }
}

