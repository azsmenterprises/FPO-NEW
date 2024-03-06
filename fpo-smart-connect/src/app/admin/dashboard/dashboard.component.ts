import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';
import { ExcelprintService } from 'src/app/service/excelprint.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gettotalIaData: any;
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
  totalIacount: any;
  totalCbbocount: any;
  dataSource: any;
  fpoSource: any;
  displayedColumns: string[] = ['slNo', 'cbboName'];
  displayedColumns1: string[] = ['slNo', 'fpoName'];
  @ViewChild('paginator1') paginator1?: MatPaginator;
  @ViewChild('paginator2') paginator2?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: any
  pagelength = 0;
  pagelength1 = 0;
  gettotalFpoData: any;
  totalFpocount: any;

  constructor(private service: RootAdminService, private toastr: ToastrService,private ExcelprintService:ExcelprintService) { 
    this.dataSource = new MatTableDataSource()
    this.fpoSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.gettotalIa();
    this.gettotalCbbo();
    this.getwomenBod();
    this.getshareHolder();
    this.getshareCapital();
    this.getaverageofCapital();
    this.getaverageofShare();
    this.gettotalFpo();
  }

  gettotalIa() {
    this.service.gettotalIa().subscribe(result => {
      this.gettotalIaData = result;
      this.totalIacount = result.length
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator1; this.dataSource.sort = this.sort
    this.fpoSource.paginator = this.paginator2; this.fpoSource.sort = this.sort
    // this.fpoSource.sort = this.sort
  }

  gettotalCbbo() {
    this.service.gettotalCbbo().subscribe(data => {
      this.gettotalCbboData = data;
      this.dataSource.data = data
      this.pagelength = data.length
      this.totalCbbocount = data.length;
    })
  }

  gettotalFpo() {
    this.service.gettotalFpo().subscribe(data => {
      this.gettotalFpoData = data;
      this.fpoSource.data = data
      this.pagelength1 = data.length
      this.totalFpocount = data.length;
    })
  }

  getwomenBod() {
    this.service.getwomenBod().subscribe(result => {
      this.getwomenBodData = result;
      // this.male = result[0]?.male
      // this.female = result[0]?.female,
      // this.total = result[0]?.total
      // this.totalmale = ((this.male / this.total) * 100).toFixed()
      // this.totalfemale = ((this.female / this.total) * 100).toFixed()
      this.male = 12;
      this.female = 88;
      this.chartData();
    })
  }

  chartData() {
    this.k = new Chart("canvasDoughnut1", {
      type: 'doughnut',
      data: {
        labels: ['Without Women BOD in %', 'With Women BOD in %'],
        datasets: [{
          data: [this.male,this.female],
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
    })
  }

  getaverageofCapital() {
    this.service.getaverageofCapital().subscribe(result => {
      this.getaverageofCapitalData = result;
    })
  }

  getaverageofShare(){
    this.service.getaverageofShare().subscribe(result => {
      this.getaverageofShareData = result;
    })
  }

  exportAsXLSX(): void {
    this.ExcelprintService.exportAsExcelFile(this.gettotalIaData, 'No of Implementing Agencies(IA)');
  }
  
  printXLSX(): void {
    this.ExcelprintService.exportAsExcelFile(this.gettotalCbboData, 'No of CBBO');
  }

  XLSXprint(): void {
    this.ExcelprintService.exportAsExcelFile(this.gettotalFpoData, 'No of FPO');
  }
}
