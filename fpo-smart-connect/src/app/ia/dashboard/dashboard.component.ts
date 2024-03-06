import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IaService } from '../ia.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ExcelprintService } from 'src/app/service/excelprint.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gettotalCbboData: any;
  k: any;
  getwomenBodData: any;
  male: any;
  female: any;
  getshareHolderData: any;
  getshareCapitalData: any;
  getaverageofCapitalData: any;
  getaverageofShareData: any;
  total: any;
  totalmale: any;
  totalfemale: any;
  gettotalFpoData: any;
  getaverageofTurnoverData:any;
  turnoverData: any;
  shareCapitalData: any;
  avgSharecapital: any;
  cbboSource: any;
  displayedColumns: string[] = ['slNo', 'cbboName'];
  @ViewChild('paginator1') paginator1?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: any
  totalCbbocount: any;
  pagelength = 0;

  constructor(private service: IaService, private toastr: ToastrService, private router: Router,private ExcelprintService:ExcelprintService) {
    this.cbboSource = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.gettotalCbbo();
    this.gettotalFpo();
    this.getwomenBod();
    this.getshareHolder();
    this.getshareCapital();
    this.getaverageofCapital();
    this.getaverageofShare();
    this.getaverageofTurnover();
  }
  ngAfterViewInit(): void {
    this.cbboSource.paginator = this.paginator1; this.cbboSource.sort = this.sort
    // this.fpoSource.sort = this.sort
  }


  gettotalCbbo() {
    this.service.gettotalCbbo().subscribe(result => {
      this.gettotalCbboData = result.totalCbbo;
      this.cbboSource.result = result
      this.pagelength = result.length
      this.totalCbbocount = result.length;
    })
  }

  gettotalFpo() {
    this.service.gettotalFpo().subscribe(result => {
  
      this.gettotalFpoData = result.totalFpo;
    })
  }

  getwomenBod() {
    this.service.getwomenBod().subscribe(result => {
      this.getwomenBodData = result;
      if(result.length > 0){
        this.male = result[0].male
        this.female = result[0].female,
        this.total = result[0].total
        this.totalmale = ((this.male / this.total) * 100).toFixed()
        this.totalfemale = ((this.female / this.total) * 100).toFixed()
        this.chartData(this.getwomenBodData);
      }else{
        this.totalmale = 100;
        this.totalfemale = 0;
      }
      
    })
  }

  chartData(a:any) {
    this.k = new Chart("canvasDoughnut1", {
      type: 'doughnut',
      data: {
        labels: ['Without Women BOD in %', 'With Women BOD in %'],
        datasets: [{
          data: [this.totalmale,this.totalfemale],
          backgroundColor: ["#a5edd5", "#4e73df"],
          hoverBackgroundColor: ["#a5edd5", "#4e73df"]
        }],
      }
    });
  }

  getshareHolder() {
    this.service.getshareHolder().subscribe(result => {
      this.getshareHolderData = result;
    })
  }

  getshareCapital() {
    this.service.getshareCapital().subscribe(result => {
      this.getshareCapitalData = result;
      this.shareCapitalData= this.getshareCapitalData?.total.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    })
  }

  getaverageofCapital() {
    this.service.getaverageofCapital().subscribe(result => {
      this.getaverageofCapitalData = result;
      this.avgSharecapital= this.getaverageofCapitalData?.Average.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    })
  }

  getaverageofShare(){
    this.service.getaverageofShare().subscribe(result => {
      this.getaverageofShareData = result;
    })
  }

  getaverageofTurnover(){
    this.service.getaverageofTurnover().subscribe(result => {
      this.getaverageofTurnoverData = result;
       this.turnoverData= this.getaverageofTurnoverData?.Average.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    })
  }

  printXLSX(): void {
    this.ExcelprintService.exportAsExcelFile(this.gettotalCbboData, 'No of CBBO');
  }
}
