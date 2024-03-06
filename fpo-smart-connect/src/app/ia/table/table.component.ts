import { Component,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IaService } from '../ia.service';
import { Router } from '@angular/router';
import { ExcelprintService } from 'src/app/service/excelprint.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  allData:any=[];
  searchText4: any = {};
  searchText5: any = {};
  searchText6: any = {};
  searchText7: any = {};
  viewData: any = [];
  dataList: any = [];
  allDataByFilter: any = [];

  constructor(private service: IaService, private toastr: ToastrService, private router: Router,private ExcelprintService:ExcelprintService) { }

  ngOnInit(): void {
    this.getAllDetails();
    this.searchText4.year ="";
    this.searchText5.timeSlot = "";
    this.searchText6.cbboName = "";
    this.searchText7.fpo = ""
  }
  getAllDetails() {
    this.service.getData().subscribe(result => {
      this.allData = result;
    })
  }
  viewDetails(details: any){
    this.dataList = details;
    this.viewData = this.dataList
  }
  exportAsXLSX(): void {
    // console.log(this.searchText4.year,"this.searchText4.year");
    if (this.searchText4.year == "" && this.searchText5.timeSlot == "" &&  this.searchText6.cbboName == "" &&  this.searchText7.fpo == "" ) {
      this.ExcelprintService.exportAsExcelFile(this.allData, 'CBBO WISE FPO MIS');
    }else{
      let data ={
        year: this.searchText4.year,
        timeSlot:this.searchText5.timeSlot,
        cbboName: this.searchText6.cbboName,
        fpo: this.searchText7.fpo
      }
      this.service.getDataByFilter(data).subscribe(result => {
        if(result.length > 0) {
        this.allDataByFilter = result;
        // console.log(this.allDataByFilter,'allDataByFilter');
        this.ExcelprintService.exportAsExcelFile(this.allDataByFilter, 'CBBO WISE FPO MIS');
        }
      })
    }
  }
}
    
