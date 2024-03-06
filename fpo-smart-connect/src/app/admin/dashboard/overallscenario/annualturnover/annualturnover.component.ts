import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../../../root-admin.service';

@Component({
  selector: 'app-annualturnover',
  templateUrl: './annualturnover.component.html',
  styleUrls: ['./annualturnover.component.css']
})
export class AnnualturnoverComponent implements OnInit {
  // M: any;
  mychart: any;
  getturnoverData: any;
  getturnoveryearwiseData: any;
  // annualturnover: boolean = true;
  getturnoveragencywiseData: any;
  turnover1: any;
  turnover2: any;
  turnover3: any;
  turnover4: any;
  turnover5: any;
  // fdc: boolean = false;
  // nfd: boolean = false;
  // nbd: boolean = false;
  // ncdc: boolean = false;
  // sfc: boolean = false;
  // chartAll: boolean = true;
  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.chartturnoverData();
    this.turnoverForm.patchValue({
      year: "2022-2023"
    })
    this.turnoverForm.patchValue({
      iaName: "ALL"
    })
    this.turnoverbyIa();
    this.turnbyyear();
  }

  turnoverForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    byvalue: new FormControl('', [Validators.required])
  })

  // getturnover() {
  //   this.service.getturnover().subscribe(result => {
  //     this.getturnoverData = result;
  //     // this.annualturnover = true;
  //   })
  // }

  getDashboardData() {
    this.turnbyyear();
    this.turnoverbyIa();
  }

  turnbyyear() {
    this.service.getturnoveryearwise(this.turnoverForm.value.year, this.turnoverForm.value.iaName).subscribe(result => {
      this.getturnoveryearwiseData = result;
      // console.log(result, "getturnoveryearwiseData");
      //  if(this.turnoverForm.value.year == 'CUMULATIVE'){
      //   this.annualturnover=true;
      // }else{
      //   this.annualturnover=false;
      // }
    })
  }

  turnoverbyIa() {
    this.service.getturnoveragencywise(this.turnoverForm.value.year, this.turnoverForm.value.iaName).subscribe(result => {
      this.getturnoveragencywiseData = result;
      // console.log(result, "getturnoveragencywiseData");
      if (result.length > 0) {
        this.turnover1 = 0;
        this.turnover2 = 0;
        this.turnover3 = 0;
        this.turnover4 = 0;
        this.turnover5 = 0;
        if (this.turnoverForm.value.iaName != 'ALL') {
          if (result[0].iaName == "FDRVC") {
            this.turnover1 = result[0]?.total;
          }
          if (result[0].iaName == "NABARD") {
            this.turnover2 = result[0]?.total
          }
          if (result[0].iaName == "NAFED") {
            this.turnover3 = result[0]?.total
          }
          if (result[0].iaName == "NCDC") {
            this.turnover4 = result[0]?.total
          }
          if (result[0].iaName == "SFAC") {
            this.turnover5 = result[0]?.total
          }
          this.mychart.destroy();
          this.chartturnoverData()
        } else {
          for (let i = 0; i < result.length; i++) {

            if (result[i].iaName == "FDRVC") {
              this.turnover1 = result[i]?.total;
            }
            if (result[i].iaName == "NABARD") {
              this.turnover2 = result[i]?.total
            }
            if (result[i].iaName == "NAFED") {
              this.turnover3 = result[i]?.total
            }
            if (result[i].iaName == "NCDC") {
              this.turnover4 = result[i]?.total
            }
            if (result[i].iaName == "SFAC") {
              this.turnover5 = result[i]?.total
            }
            if (result.length == i + 1) {
              this.mychart.destroy();
              this.chartturnoverData()
            }
          }
        }
      }
       else {
        this.turnover1 = 0;
        this.turnover2 = 0;
        this.turnover3 = 0;
        this.turnover4 = 0;
        this.turnover5 = 0;
        // this.mychart.reset();
        this.mychart.destroy();
        this.chartturnoverData()
        // this.mychart.data.datasets.data = [this.turnover1, this.turnover2, this.turnover3, this.turnover4, this.turnover5]
        // this.mychart.update();
      }

      // this.turnover1 = result[0]?.total
      // this.turnover2 = result[1]?.total
      // this.turnover3 = result[2]?.total
      // this.turnover4 = result[3]?.total
      // this.turnover5 = result[4]?.total
      // this.chartturnoverData(this.getturnoveragencywiseData)
    })
  }

  chartturnoverData() {
    // if (this.turnoverForm.value.iaName == 'FDRVC') {
    //   this.fdc = true;
    //   this.nbd = false;
    //   this.ncdc = false;
    //   this.chartAll = false;
    //   this.nfd = false;
    //   this.sfc = false;
    //   this.mychart = new Chart("canvasDoughnut6", {
    //     type: 'bar',
    //     data: {
    //       labels: ['FDRVC'],
    //       datasets: [{
    //         label: "Annual Turnover",
    //         data: [this.turnover1],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 60
    //       }],
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // } else if (this.turnoverForm.value.iaName == 'NABARD') {
    //   this.fdc = false;
    //   this.nbd = true;
    //   this.ncdc = false;
    //   this.chartAll = false;
    //   this.nfd = false;
    //   this.sfc = false;
    //   this.mychart = new Chart("canvasDoughnut7", {
    //     type: 'bar',
    //     data: {
    //       labels: ['NABARD'],
    //       datasets: [{
    //         label: "Annual Turnover",
    //         data: [this.turnover2],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 60
    //       }],
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // } else if (this.turnoverForm.value.iaName == 'NAFED') {
    //   this.fdc = false;
    //   this.nfd = true;
    //   this.sfc = false;
    //   this.nbd = false;
    //   this.ncdc = false;
    //   this.chartAll = false;
    //   this.mychart = new Chart("canvasDoughnut8", {
    //     type: 'bar',
    //     data: {
    //       labels: ['NAFED'],
    //       datasets: [{
    //         label: "Annual Turnover",
    //         data: [this.turnover3],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 60
    //       }],
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // } else if (this.turnoverForm.value.iaName == 'NCDC') {
    //   this.fdc = false;
    //   this.nbd = false;
    //   this.ncdc = true;
    //   this.chartAll = false;
    //   this.nfd = false;
    //   this.sfc = false;
    //   this.mychart = new Chart("canvasDoughnut9", {
    //     type: 'bar',
    //     data: {
    //       labels: ['NCDC'],
    //       datasets: [{
    //         label: "Annual Turnover",
    //         data: [this.turnover4],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 60
    //       }],
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // } else if (this.turnoverForm.value.iaName == 'SFAC') {
    //   this.fdc = false;
    //   this.nbd = false;
    //   this.ncdc = false;
    //   this.chartAll = false;
    //   this.nfd = false;
    //   this.sfc = true;
    //   this.mychart = new Chart("canvasDoughnut10", {
    //     type: 'bar',
    //     data: {
    //       labels: ['SFAC'],
    //       datasets: [{
    //         label: "Annual Turnover",
    //         data: [this.turnover5],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 60
    //       }],
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // }
    // else {
    // this.fdc = false;
    // this.nbd = false;
    // this.ncdc = false;
    // this.chartAll = true;
    // this.nfd = false;
    // this.sfc = false;
    this.mychart = new Chart("canvasDoughnut11", {
      type: 'bar',
      data: {
        labels: ['FDRVC', 'NABARD', 'NAFED', 'NCDC', 'SFAC'],
        datasets: [{
          label: "Annual Turnover",
          data: [this.turnover1, this.turnover2, this.turnover3, this.turnover4, this.turnover5],
          backgroundColor: ["#00bfff", "#00bfff", "#00bfff", "#00bfff", "#00bfff"],
          barThickness: 60
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        },
      }
    });

    // this.mychart = new Chart("canvasDoughnut4", {
    //   type: 'bar',
    //   data: {
    //     labels: ['FDRVC','NABARD','NCDC'],
    //     datasets: [{
    //       label: "Annual Turnover",
    //       data: [this.turnover1,this.turnover2,this.turnover3],
    //       backgroundColor: ["#00bfff","#00bfff","#00bfff"],
    //       hoverBackgroundColor: ["#00bfff","#00bfff","#00bfff"],
    //       barThickness:60
    //     }],
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //           ticks: {
    //               beginAtZero: true
    //           }
    //       }]
    //   },
    //   }
    // });
  }

}
