import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CbboService } from '../cbbo.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { ExcelprintService } from 'src/app/service/excelprint.service';
// import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisComponent implements OnInit {
  getAllData: any = [];
  dataList: any;
  dataList1: any;
  searchText1: any = {};
  searchText2: any = {};
  searchText3: any = {};
  searchText4: any = {};
  getdraftData: any;
  viewData: any = [];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any
  pagelength = 0
  csIndexToApprove: any
  // p:number=1;
  // public A=10;
  displayedColumns: string[] = ['position', 'financialYear', 'iaName', 'fppoName', 'mobilenumber', 'mailId', 'date'];
  cbboDataByFilter: any = [];



  constructor(private service: CbboService, private toastr: ToastrService, private router: Router, private ExcelprintService: ExcelprintService) {

  }

  ngOnInit(): void {
    this.getData();
    this.getAllDetails();
    this.draftedData();
    this.searchText1.year = "";
    this.searchText2.timeSlot = "";
    this.searchText3.iaName = "";
    this.searchText4.fpo = "";
   
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  // }


  updateForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    fpo: new FormControl('', [Validators.required]),
    MobileNo: new FormControl('', [Validators.required])

  })
  viewForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    fpo: new FormControl('', [Validators.required]),
    MobileNo: new FormControl('', [Validators.required])

  })


  getData() {
    this.service.getData().subscribe(data => {
      this.dataSource = data;
      // console.log(this.dataSource );
      this.pagelength = this.dataSource;
    })
  }


  getAllDetails() {
    this.service.getData().subscribe(result => {
      this.getAllData = result;
      // console.log(result,'result');

      // this.getAllData= new MatTableDataSource(this.getAllData);
      // setTimeout(() => { this.getAllData.paginator = this.paginator; this.getAllData.sort = this.sort; });
    })
  }

  draftedData() {
    this.service.draftedData().subscribe(result => {
      this.getdraftData = result;
    })
  }
  deleteRow(details: any) {
    if (confirm('Are you sure to delete ?')) {
      this.service.deleteRow(details).subscribe(data => {
        if (data) {
          this.toastr.success('Deleted successfully')
          // this.getData();
          this.getAllDetails();
        }
      });
    }
  }
  // viewEditDetails(details: any) {
  //   this.dataList1 = details;
  //   this.updateForm.setValue({
  //     year: details.year,
  //     iaName: details.iaName,
  //     fpo: details.fpo,
  //     MobileNo: details.MobileNo
  //   });
  // }
  // updateList() {
  //   // console.log(this.dataList1);
  //   const data = {
  //     cbboSNo : this.dataList1.cbboSNo,
  //     year: this.updateForm.value.year,
  //     iaName: this.updateForm.value.iaName,
  //     fpo: this.updateForm.value.fpo,
  //     MobileNo: this.updateForm.value.MobileNo,
  //   }
  //   this.service.updateList(data).subscribe(data => {
  //     if (data) {
  //       this.toastr.success('Updated Successfully')
  //       this.getData()
  //       this.draftedData()
  //     } else {
  //       this.toastr.warning('Updated unsuccessful')

  //     }
  //   })
  // }


  viewDetails(details: any) {
    // console.log(details,'details');
    this.dataList = details;
    this.viewData = this.dataList
    // console.log('this.viewData',this.viewData);

    // this.viewForm.setValue({
    //   year: details.year,
    //   iaName: details.iaName,
    //   fpo: details.fpo,
    //   MobileNo: details.MobileNo
    // });
  }

  publish(data: any) {
    if (confirm('Are you sure to publish ?')) {
      this.service.publish(data).subscribe(
        data => {
          if (data.status == 1) {
            this.toastr.success('Approved Successfully', 'Success')
            this.getData()
            this.draftedData()
          }
          if (data.status == 0) {
            this.toastr.info('Already approved', 'Warning')
          }
        },
        error => {
          this.toastr.error('Unexpected Error')
        }
      )
    }
  }
  exportAsXLSX(): void {
    if (this.searchText1.year == "" && this.searchText2.timeSlot == "" &&  this.searchText3.iaName == "" &&  this.searchText4.fpo == "" ) {
      this.ExcelprintService.exportAsExcelFile(this.getAllData, 'CBBO WISE FPO WISE PUBLISHED TABLE ');
    }else{
      let data ={
        year: this.searchText1.year,
        timeSlot:this.searchText2.timeSlot,
        iaName: this.searchText3.iaName,
        fpo: this.searchText4.fpo
      }
      this.service.getCbboDataByFilter(data).subscribe(result => {
        this.cbboDataByFilter = result;
        // console.log(this.cbboDataByFilter,'cbboDataByFilter');
        this.ExcelprintService.exportAsExcelFile(this.cbboDataByFilter, 'CBBO WISE FPO WISE PUBLISHED TABLE ');
      })
    }
  }



  /*name of the excel-file which will be downloaded. */
  // fileName = 'ExcelSheet.xlsx';
  // exportAsXLSX(): void {
  //   /* table id is passed over here */
  //   let element = document.getElementById('excel-table');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);

  // }
}
  // applyFilter(event: Event) {
  //   console.log(this.getAllData,'this.');

  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.getAllData.filter = filterValue.trim().toLowerCase();
  // }
// }
