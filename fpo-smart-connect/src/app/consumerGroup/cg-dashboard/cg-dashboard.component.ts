import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ConsumerGroupService } from '../consumer-group.service';
import { Chart } from 'chart.js'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cg-dashboard',
  templateUrl: './cg-dashboard.component.html',
  styleUrls: ['./cg-dashboard.component.css']
})
export class CgDashboardComponent implements OnInit {

  dashboardData: any
  dataSource: any
  backgroundColor :any= ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)' ];
  borderColor :any= ['rgba(255, 99, 132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)' ];
  displayedColumns: string[] = ['slNo', 'fpoName', 'address', 'mobNo', 'email', 'yearOfFormation', 'dateOfReg'];
  serverUrl=`${environment.port}`


  constructor(private cgServ: ConsumerGroupService, private appServ: AppService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()
    // Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getDashboardData()
    this.getDashboardChart()
  }
  // this.arrayData =
  loadBarChart(data1:any){
    
    var myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        // labels: ['Tomato', 'Potato', 'Cucumber', 'Cauliflower', 'Carrot', 'Radish'],
        labels: data1.map((a: { Crop_Name: any; }) => a.Crop_Name),
        datasets: [{
          label: '',
          data:data1.map((a: { Unit: any; }) => a.Unit),
          backgroundColor: this.backgroundColor.slice(0,data1.length),
          borderColor: this.borderColor.slice(0,data1.lenth),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          // y: {
          //   beginAtZero: true
          // }
        }
      }
    });
  }

  loadPieChart(data1:any){
    var piechart = new Chart('piechart', {
      type: 'doughnut',
      data: {
        labels: data1.map((a: { Crop_Name: any; })=>a.Crop_Name),
        datasets: [{
          label: 'Products',
          data:data1.map((a: { minQuantity: any; }) => a.minQuantity),
          backgroundColor: this.backgroundColor.slice(0,data1.length),
          borderColor:this.borderColor.slice(0,data1.length),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          // y: {
          //   beginAtZero: true
          // }
        }
      }
    });
  }

  getDashboardData() {
    this.cgServ.getDashboardData(this.appServ.cgRefNo).subscribe(
      data => {
        if (data) {
          // ////console.log(data,"cgdashboard");
          this.dashboardData = data
          this.dataSource.data = data.fpoData

        } else {
          this.toastr.error('Unexpected error')
        }
      },
      error => {
        this.toastr.error('Server error')
      }
    )
  }

  getDashboardChart() {
    this.cgServ.getDashboardChart(this.appServ.cgRefNo).subscribe(
      data => {
        if (data) {
          ////console.log(data,"cgdashboar444d");
          this.loadBarChart(data)
          this.loadPieChart(data)
        } else {
          this.toastr.error('Unexpected error')
        }
      },
      error => {
        this.toastr.error('Server error')
      }
    )
  }

}
