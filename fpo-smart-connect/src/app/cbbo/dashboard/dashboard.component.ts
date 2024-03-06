import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CbboService } from '../cbbo.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

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
  getaverageofTurnoverData: any;
  getTotalFpoData: any;
  turnOverAvg: any;
  shareCapitalAmount: any;
  shareCapitalAverage: any;
  constructor(private service: CbboService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.gettotalCbbo();
    this.getwomenBod();
    this.getshareHolder();
    this.getshareCapital();
    this.getaverageofCapital();
    this.getaverageofShare();
    this.getaverageofTurnover();
    this.getTotalFpo();
  }

  gettotalCbbo() {
    this.service.gettotalCbbo().subscribe(result => {
      this.gettotalCbboData = result;
    })
  }

  getwomenBod() {
    this.service.getwomenBod().subscribe(result => {
      if(result.length > 0) {
        this.getwomenBodData = result;
        this.male = result[0].male
        this.female = result[0].female,
          this.total = result[0].total
        this.totalmale = ((this.male / this.total) * 100).toFixed()
        this.totalfemale = ((this.female / this.total) * 100).toFixed()
        this.chartData(this.getwomenBodData);
      }else{
        this.totalmale = 100;
        this.totalfemale =0;
        this.chartData(this.getwomenBodData);
      }
      
    })
  }

  chartData(a: any) {
    this.k = new Chart("canvasDoughnut1", {
      type: 'doughnut',
      data: {
        labels: ['Without Women BOD in %', 'With Women BOD in %'],
        datasets: [{
          data: [this.totalmale, this.totalfemale],
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
      this.shareCapitalAmount = this.getshareCapitalData?.total.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    })
  }

  getaverageofCapital() {
    this.service.getaverageofCapital().subscribe(result => {
      this.getaverageofCapitalData = result;
      this.shareCapitalAverage= this.getaverageofCapitalData?.Average.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    })
  }

  getaverageofShare() {
    this.service.getaverageofShare().subscribe(result => {
      this.getaverageofShareData = result;
    })
  }

  getaverageofTurnover() {
    this.service.getaverageofTurnover().subscribe(result => {
      this.getaverageofTurnoverData = result;
      this.turnOverAvg = this.getaverageofTurnoverData?.Average.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    })
  }

  getTotalFpo() {
    this.service.getTotalFpo().subscribe(result => {
      this.getTotalFpoData = result;
    })
  }
}
