import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';

@Component({
  selector: 'app-fpo-update',
  templateUrl: './fpo-update.component.html',
  styleUrls: ['./fpo-update.component.css']
})
export class FpoUpdateComponent implements OnInit {

  schedule: any;
  url: any;
  fromdate: any;
  todate: any;
  addData: any;
  public show = '';
  public data = [];
  public deletedata = '';
  public updatedata = '';
  menuList: any;
  details: any;

  infoType:any

  constructor(private service: RootAdminService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.alldataShow();
    this.getInfoType()
  }

  addForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
    url: new FormControl(''),
    fromdate: new FormControl('', [Validators.required]),
    todate: new FormControl('', [Validators.required]),
    type:new FormControl('',[Validators.required])
  })

  updateForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    fromdate: new FormControl('', [Validators.required]),
    todate: new FormControl('', [Validators.required])

  })

  getInfoType(){
    this.service.getInfoType().subscribe(
      data=>{
        this.infoType=data
      }
    )
  }


  Submit() {
    let menu = this.addForm.value;
    // ////console.log(666,this.addForm.value);

    this.service.marquee_service(menu).subscribe((result) => {
      this.addData = result
      if (result.status == 1) {
        alert("Details Added Successfully")
        this.addForm.patchValue({ text: '', url: '', fromdate: '', todate: '' })
        this.service.marqueeDataList().subscribe((result) => {
          // ////console.log(result);
          this.menuList = result;
        });
      }

    })
  }
  delete(x: any) {
    this.service.deleteMarquee(x).subscribe((result) => {
      // this.alldata = result
      // ////console.log(this.alldata);
      if(result.status==1){
        this.alldataShow();
      }

    });
  }
  viewMenuDetails(x: any) {
    this.details = x;
  }
  viewEditDetails(x: any) {
    this.details = x;
    this.updateForm.setValue({
      text: x.text,
      url: x.url,
      fromdate: x.fromdate.substring(0, 10),
      todate: x.todate.substring(0, 10)
    });
    // this.service.oneMenuDelete(x).subscribe((result) => {
    //   this.alldata = JSON.parse(JSON.stringify(result))
    //   // ////console.log(this.alldata);
    //   this.alldataShow();

    // });
  }

  alldataShow() {
    this.service.marqueeDataList().subscribe((result) => {
      // ////console.log(result);

      this.menuList = result;


    });

  }

  updateMarquee(id: any) {
    let menu = this.updateForm.value;
    this.service.updateMarquee(menu, id).subscribe((result) => {
      this.addData = result
      
      if(result.status==1){
        this.toastr.info('Details updated Successfully','Success')
        this.alldataShow();
      }
    })
  }

}
