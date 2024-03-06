import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from 'src/app/fig/fig-service.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-stocks-report',
  templateUrl: './stocks-report.component.html',
  styleUrls: ['./stocks-report.component.css']
})
export class StocksReportComponent implements OnInit {
  allFpoGodowns: any;
  allGodowns: any;
  allCropCat: any;
  allcrops: any;
  allVarieties: any;
  dataSource: any
  displayedColumns: string[] = ['slNo','District','Godown','Crop', 'Variety', 'Quantity'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any

  constructor(private appserv:AppService,private fpoServ:AdminService,private figServ:FigServiceService,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.fpoServ.getAllFpoGodowns(this.appserv.fpoId).subscribe(
      data=>{
        this.allFpoGodowns=data
      })

    this.getAllStockInTransitData()

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  reportForm=new FormGroup({
    godownId:new FormControl(null,Validators.required),
    cropCatagory:new FormControl(null,Validators.required),
    crop:new FormControl(null,Validators.required),
    variety:new FormControl(null,Validators.required),
  })

  loadAllCropCat(){
    this.figServ.getCropCata().subscribe(
      data=>{
        this.allCropCat=data
      }
    )
  }

  loadAllCrop(){
    this.figServ.getCropAccToCatagory(this.reportForm.value.cropCatagory).subscribe(
      data=>{
        this.allcrops=data
      },
      error=>{
        this.toastr.error(error.message)
      }
    )
  }

  loadAllVariety(){
    this.figServ.getAllVarieties(this.reportForm.value.crop).subscribe(
      data=>{
        this.allVarieties=data
        
      }
    )
  }

  searchGodownReport(){
    this.fpoServ.searchGodownReport(this.reportForm.value,this.appserv.fpoId).subscribe(
      data=>{

      }
    )
  }

  getAllStockInTransitData(){
    this.fpoServ.getAllStockInTransitData(this.appserv.fpoId).subscribe(
      data=>{
        this.dataSource.data = data
        this.pagelength = data.length
      }
    )
  }
}
